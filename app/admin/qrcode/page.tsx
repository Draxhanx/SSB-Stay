"use client";

import { QRCodeCanvas } from "qrcode.react";
import {
  Download,
  ExternalLink,
  Globe,
  LayoutDashboard,
  Star,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function AdminQRCode() {
  const websiteQrRef = useRef<HTMLDivElement>(null);
  const feedbackQrRef = useRef<HTMLDivElement>(null);
  const [siteUrl, setSiteUrl] = useState("");

  useEffect(() => {
    setSiteUrl(window.location.origin);
  }, []);

  const downloadQR = (
    ref: React.RefObject<HTMLDivElement | null>,
    name: string,
    title: string,
    slogan: string,
  ) => {
    const qrCanvas = ref.current?.querySelector("canvas");
    if (qrCanvas) {
      // Create a higher resolution canvas for download
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = 600;
      const height = 900;
      canvas.width = width;
      canvas.height = height;

      // Create download process
      const logo = new window.Image();
      logo.src = "/logo.png";
      logo.crossOrigin = "anonymous";

      logo.onload = () => {
        // 1. White background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);

        // 2. Draw Logo at top
        const logoWidth = 220;
        const logoHeight = (logo.height * logoWidth) / logo.width;
        ctx.drawImage(logo, (width - logoWidth) / 2, 50, logoWidth, logoHeight);

        // 3. Brand name under logo
        ctx.fillStyle = "#14b8a6"; // primary
        ctx.font = "bold 28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Shaurya SSB Stay", width / 2, logoHeight + 100);

        // 4. Draw QR Code (Higher up for cleaner look)
        const qrSize = 440;
        ctx.drawImage(
          qrCanvas,
          (width - qrSize) / 2,
          logoHeight + 160,
          qrSize,
          qrSize,
        );

        // 6. Draw Slogan at bottom
        ctx.fillStyle = "#64748b"; // slate-500
        ctx.font = "italic 26px sans-serif";
        ctx.fillText(`"${slogan}"`, width / 2, height - 120);

        // 7. Small Brand at extreme bottom
        ctx.fillStyle = "#cbd5e1"; // slate-300
        ctx.font = "bold 20px sans-serif";
        ctx.fillText(
          "Shaurya SSB Stay - Book Your Stay Today",
          width / 2,
          height - 50,
        );

        // Perform download
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name}-qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    }
  };

  const qrConfigs = [
    {
      title: "Website URL",
      description: "Direct guests to your main homepage for bookings.",
      slogan: "Your Gateway to Excellence and Comfort",
      url: siteUrl,
      ref: websiteQrRef,
      icon: <Globe className="text-primary" />,
      fileName: "ssbstay-website",
    },
    {
      title: "Review Form",
      description:
        "Collect feedback by sending guests straight to the review page.",
      slogan: "Your Voice Shapes Our Service",
      url: `${siteUrl}/reviews/new`,
      ref: feedbackQrRef,
      icon: <Star className="text-secondary" />,
      fileName: "ssbstay-reviews",
    },
  ];

  return (
    <div className="p-8 bg-gray-50/50 dark:bg-background/50 min-h-screen transition-colors duration-300">
      <div className="mb-12 text-center sm:text-left transition-all">
        <h1 className="text-3xl font-heading font-semibold text-primary-dark dark:text-white mb-2">
          QR Code Generator
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium italic">
          Download branded QR codes for your offline marketing materials.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
        {qrConfigs.map((config, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 p-10 rounded-xl shadow-xl shadow-teal-900/5 border border-secondary/10 dark:border-white/5 flex flex-col items-center relative overflow-hidden group hover:border-primary/30 transition-all duration-300"
          >
            {/* Top Logo & Brand */}
            <div className="mb-8 flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Logo"
                width={140}
                height={45}
                className="object-contain dark:brightness-110"
              />
              <span className="text-primary font-bold text-sm tracking-tight">
                Shaurya SSB Stay
              </span>
            </div>

            <div className="w-16 h-16 bg-secondary-light/30 dark:bg-white/5 rounded-xl flex items-center justify-center mb-6 shadow-sm">
              {config.icon}
            </div>

            <h2 className="text-2xl font-semibold text-primary-dark dark:text-white mb-2 uppercase tracking-tight">
              {config.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center font-medium mb-4 text-sm px-4 italic">
              {config.description}
            </p>
            <p className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-8 text-center bg-primary/5 dark:bg-primary/10 px-6 py-2 rounded-full border border-primary/10">
              {config.slogan}
            </p>

            <div
              ref={config.ref}
              className="p-6 bg-white border-2 border-dashed border-secondary/20 dark:border-white/10 rounded-xl mb-8 group transition-all hover:border-primary/40 relative shadow-inner"
            >
              <QRCodeCanvas
                value={config.url}
                size={200}
                level="H"
                includeMargin={true}
                className="rounded-xl"
              />
            </div>

            <div className="w-full space-y-4">
              <button
                onClick={() =>
                  downloadQR(
                    config.ref,
                    config.fileName,
                    config.title,
                    config.slogan,
                  )
                }
                className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-lg shadow-teal-900/10 active:scale-95"
              >
                <Download size={18} /> Download PNG
              </button>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-background/50 rounded-xl border border-gray-100 dark:border-white/5">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 truncate max-w-[180px] uppercase tracking-widest">
                  {config.url}
                </span>
                <a
                  href={config.url}
                  target="_blank"
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Bottom Brand */}
            <div className="mt-10 border-t border-gray-100 dark:border-white/5 w-full pt-6 flex flex-col items-center gap-3">
              <Image
                src="/logo.png"
                alt="Logo"
                width={70}
                height={25}
                className="opacity-20 grayscale dark:invert dark:brightness-200"
              />
              <span className="text-[9px] font-bold text-gray-300 dark:text-gray-600 uppercase tracking-[0.3em]">
                SHAURYA SSB STAY
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary p-10 rounded-xl text-white flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125" />
        <div className="flex items-center gap-8 relative z-10">
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md shadow-lg">
            <LayoutDashboard size={28} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold uppercase tracking-tight">
              Marketing Tip
            </h3>
            <p className="opacity-80 font-medium italic text-lg pr-4">
              "Print these QR codes on posters near exam centers for maximum
              reach!"
            </p>
          </div>
        </div>
        <div className="relative z-10 w-full sm:w-auto">
          <div className="bg-white/10 px-6 py-3 rounded-full border border-white/20 text-sm font-bold uppercase tracking-widest text-center">
            Growth Strategy
          </div>
        </div>
      </div>
    </div>
  );
}
