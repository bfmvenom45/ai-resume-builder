export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

// Function to check if we're in a browser environment
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  if (!isBrowser()) {
    throw new Error("PDF conversion is only available in browser environment");
  }

  isLoading = true;
  
  // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not typed
  loadPromise = import("pdfjs-dist/build/pdf.mjs")
    .then(async (lib) => {
      console.log("PDF.js library imported successfully, version:", lib.version);
      
      // Use the correct worker version that matches the library
      const version = lib.version || "5.4.54";
      
      // Try to use local worker first, fallback to CDN
      try {
        // Check if local worker exists
        const response = await fetch("/pdf.worker.min.mjs");
        if (response.ok) {
          lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
          console.log("Using local PDF.js worker");
        } else {
          throw new Error("Local worker not found");
        }
      } catch (error) {
        console.warn("Local worker not available, using CDN:", error);
        lib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;
        console.log(`Using CDN PDF.js worker version ${version}`);
      }
      
      pdfjsLib = lib;
      isLoading = false;
      return lib;
    })
    .catch((error) => {
      console.error("Failed to load PDF.js:", error);
      isLoading = false;
      loadPromise = null;
      throw new Error(`Failed to load PDF.js library: ${error.message}`);
    });

  return loadPromise;
}

export async function convertPdfToImage(
  file: File,
  timeoutMs: number = 30000 // 30 seconds timeout
): Promise<PdfConversionResult> {
  return new Promise(async (resolve) => {
    // Set a timeout for the entire operation
    const timeoutId = setTimeout(() => {
      console.error("PDF conversion timed out");
      resolve({
        imageUrl: "",
        file: null,
        error: "PDF conversion timed out after 30 seconds",
      });
    }, timeoutMs);

    try {
      console.log("Starting PDF conversion for file:", file.name);
      
      if (!file.type.includes('pdf')) {
        clearTimeout(timeoutId);
        resolve({
          imageUrl: "",
          file: null,
          error: "File is not a PDF",
        });
        return;
      }

      if (!isBrowser()) {
        clearTimeout(timeoutId);
        resolve({
          imageUrl: "",
          file: null,
          error: "PDF conversion only available in browser",
        });
        return;
      }

      const lib = await loadPdfJs();
      console.log("PDF.js library loaded successfully");

      const arrayBuffer = await file.arrayBuffer();
      console.log("File converted to array buffer, size:", arrayBuffer.byteLength);
      
      const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
      console.log("PDF document loaded, pages:", pdf.numPages);
      
      const page = await pdf.getPage(1);
      console.log("First page loaded");

      const viewport = page.getViewport({ scale: 2 }); // Reduced scale for better performance
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        clearTimeout(timeoutId);
        resolve({
          imageUrl: "",
          file: null,
          error: "Failed to get canvas context",
        });
        return;
      }

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      console.log("Rendering page to canvas...");
      await page.render({ canvasContext: context, viewport }).promise;
      console.log("Page rendered successfully");

      canvas.toBlob(
        (blob) => {
          clearTimeout(timeoutId);
          if (blob) {
            console.log("Blob created successfully, size:", blob.size);
            // Create a File from the blob with the same name as the pdf
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });

            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            console.error("Failed to create blob");
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/png",
        0.9 // Slightly reduced quality for better performance
      );
    } catch (err) {
      clearTimeout(timeoutId);
      console.error("PDF conversion error:", err);
      resolve({
        imageUrl: "",
        file: null,
        error: `Failed to convert PDF: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  });
}