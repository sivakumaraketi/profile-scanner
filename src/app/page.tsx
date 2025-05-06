"use client";
import React, { useState, useRef, useEffect } from "react";
import QRCode from "react-qr-code";
import { useSpring } from "react-spring";

const Scanner = () => {
  const [inputValue, setInputValue] = useState(
    "https://europa.eu/europass/eportfolio/api/eprofile/shared-profile/siva+kumar-aketi/fab13cca-9f88-42d9-9590-0c70212e0c7f?view=html"
  );
  const [qrValue, setQrValue] = useState<string | null>(inputValue);
  const [error, setError] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const qrCodeRef = useRef<SVGSVGElement>(null);

  const fadeIn = useSpring({
    opacity: qrValue ? 1 : 0,
    transform: qrValue ? "scale(1)" : "scale(0.5)",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      new URL(inputValue);
      setQrValue(inputValue);
      setError("");
    } catch {
      setQrValue(null);
      setError("Please enter a valid URL.");
    }
  };

  const handleDownload = () => {
    if (!qrCodeRef.current) return;
  
    const svg = qrCodeRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
  
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
  
      // Create a temporary link to download the image
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
  
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    };
  
    // Convert the SVG data to a data URL instead of a blob URL
    const svgBase64 = btoa(unescape(encodeURIComponent(svgData)));
    img.src = `data:image/svg+xml;base64,${svgBase64}`;
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 p-4">
      <h2 className="text-xl font-semibold mb-4">Generate Your QR Code</h2>
      <p className="text-gray-600 mb-4">Designed by Siva Kumar Aketi</p>
      <p className="text-gray-600 mb-4">
        Enter a valid URL to generate a QR code.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          className="border border-gray-300 rounded p-2 mb-2 w-[300px]"
          placeholder="Enter a valid URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded px-4 py-2"
        >
          Generate QR Code
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {qrValue && (
        <div className="mt-8 flex flex-col items-center">
          <h3 className="text-lg font-medium mb-2" style={fadeIn}>
            Scan the QR Code:
          </h3>
          <div style={fadeIn}>
            <QRCode
              value={qrValue}
              size={256}
              ref={qrCodeRef}
            />
          </div>
          <button
            onClick={handleDownload}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded px-4 py-2"
          >
            Download QR Code
          </button>
          {downloadSuccess && (
            <p className="text-green-500 mt-4">
              QR Code downloaded successfully!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Scanner;