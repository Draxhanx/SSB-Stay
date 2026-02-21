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
  ) => {
    const canvas = ref.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const qrConfigs = [
    {
      title: "Website URL",
      description: "Direct guests to your main homepage for bookings.",
      url: siteUrl,
      ref: websiteQrRef,
      icon: <Globe className="text-primary" />,
      fileName: "hostelhub-website",
    },
    {
      title: "Review Form",
      description:
        "Collect feedback by sending guests straight to the review page.",
      url: `${siteUrl}/reviews/new`,
      ref: feedbackQrRef,
      icon: <Star className="text-secondary" />,
      fileName: "hostelhub-reviews",
    },
  ];

  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-heading font-black text-primary-dark">
          QR Code Generator
        </h1>
        <p className="text-gray-500 font-medium">
          Download QR codes for your offline marketing materials.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
        {qrConfigs.map((config, index) => (
          <div
            key={index}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-secondary/10 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-secondary-light/30 rounded-2xl flex items-center justify-center mb-6">
              {config.icon}
            </div>

            <h2 className="text-2xl font-black text-primary-dark mb-2">
              {config.title}
            </h2>
            <p className="text-gray-500 text-center font-medium mb-8 text-sm px-4">
              {config.description}
            </p>

            <div
              ref={config.ref}
              className="p-6 bg-white border-2 border-dashed border-secondary/20 rounded-3xl mb-8 group transition-all hover:border-primary/40"
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
                onClick={() => downloadQR(config.ref, config.fileName)}
                className="w-full bg-primary text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-primary-dark transition shadow-lg shadow-teal-900/10"
              >
                <Download size={20} /> Download PNG
              </button>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-xs font-bold text-gray-400 truncate max-w-[180px]">
                  {config.url}
                </span>
                <a
                  href={config.url}
                  target="_blank"
                  className="text-primary hover:text-primary-dark"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary p-8 rounded-[2rem] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <LayoutDashboard size={24} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Marketing Tip</h3>
            <p className="opacity-80 text-sm font-medium">
              Print these QR codes on posters near exam centers!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
