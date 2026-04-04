"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FiMoreHorizontal, FiX, FiSettings, FiDatabase, FiImage, FiCheckCircle, FiMaximize2, FiChevronLeft, FiChevronRight, FiDownload, FiSliders } from "react-icons/fi";

const Toggle = ({ on, onChange }) => (
  <button onClick={onChange} role="switch" aria-checked={on}
    className={`relative w-[44px] h-[24px] rounded-full border-none cursor-pointer flex-shrink-0 p-0 transition-colors duration-200 ${on ? 'bg-[#6d0f1f]' : 'bg-[#e7d9d6]'}`}
  >
    <span className={`absolute top-[2px] w-[20px] h-[20px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.2)] transition-all duration-200 block ${on ? 'left-[calc(100%-22px)]' : 'left-[2px]'}`} />
  </button>
);

const Thumb = ({ src }) => (
  <div className="w-[56px] h-[56px] rounded-[14px] bg-[#f4ebe8] border border-[#f1d6d6] flex-shrink-0 flex items-center justify-center overflow-hidden">
    {src ? (
      <img src={src} alt="thumbnail" className="w-full h-full object-cover" />
    ) : (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#e8d5cf" />
        <circle cx="8.5" cy="8.5" r="2.5" fill="#c9a89e" />
        <path d="M3 16l5-5 4 4 3-3 6 6" stroke="#c9a89e" strokeWidth="1.5" fill="none" />
      </svg>
    )}
  </div>
);



const DropdownIcons = {
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M12 8v1"></path>
      <path d="M12 15v1"></path>
      <path d="M8 12h1"></path>
      <path d="M15 12h1"></path>
    </svg>
  ),
  Palette: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.08 0 1.94-.96 1.94-2.07 0-.55-.22-1.05-.59-1.41-.36-.36-.59-.85-.59-1.4 0-1.12.89-2.01 2.01-2.01H18c3.31 0 6-2.69 6-6 0-4.42-5.37-8-12-8z"></path>
    </svg>
  ),
  Image: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  ),
  Resize: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <rect x="3" y="14" width="7" height="7" rx="1" ry="1"></rect>
    </svg>
  ),
};

const MenuItem = ({ icon, label, onClick, className = "" }) => (
  <button onClick={onClick}
    className={`flex items-center gap-[14px] w-full text-left border-none px-6 cursor-pointer text-[15px] font-medium font-inter text-[#6D0F1F] bg-transparent hover:bg-[#FDF8F4] transition-all flex-1 ${className}`}>
    <span className="text-[#6D0F1F] flex items-center justify-center">{icon}</span>
    {label}
  </button>
);

const PageBtn = ({ children, active, onClick }) => (
  <button onClick={onClick}
    className={`min-w-[34px] h-[34px] rounded-[10px] text-[12px] font-bold flex items-center justify-center cursor-pointer px-1 transition-all duration-150 ${active ? 'border-none bg-[#6d0f1f] text-white' : 'border border-[#f1d6d6] bg-[#fdf8f4] hover:bg-[#fdf3f3] text-[#7a5a64]'}`}>
    {children}
  </button>
);

const TH = ({ ch, className = "text-left" }) => (
  <th className={`text-[10px] font-bold text-[#7a5a64] opacity-40 uppercase tracking-[0.14em] px-[14px] pb-[14px] whitespace-nowrap ${className}`}>{ch}</th>
);

export default function ProductsPage() {
  const [menu, setMenu] = useState(null);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState("2D");
  const [page, setPage] = useState(1);
  const menuRef = useRef(null);
  const router = useRouter(); // Initialize router

  const [opts, setOpts] = useState({ aiEditor: true, imageEdit: true, textEdit: true, colors: false, clipart: false });
  const [rows, setRows] = useState([
    { id: "01", name: "Midnight Velvet Blazer", sub: "BESPOKE COLLECTION", sku: "AT-MVB-2024-X", on: true, image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1775283363/Midnight%20Velvet%20Blazer.png" },
    { id: "02", name: "Oxford Wool Trousers", sub: "DAILY LUXURY", sku: "AT-OWT-1888-M", on: true, image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1775283363/Midnight%20Velvet%20Blazer.png" },
    { id: "03", name: "Hand-Stitched Brogues", sub: "FOOTWEAR ARTISAN", sku: "AT-HSB-4491-L", on: false, image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1775283363/Midnight%20Velvet%20Blazer.png" },
    { id: "04", name: "Silk Paisley Pocket Square", sub: "ACCESSORIES", sku: "AT-PPS-0092-U", on: true, image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1775283363/Midnight%20Velvet%20Blazer.png" },
  ]);

  useEffect(() => {
    const h = e => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const toggleRow = id => setRows(p => p.map(r => r.id === id ? { ...r, on: !r.on } : r));
  const toggleOpt = key => setOpts(p => ({ ...p, [key]: !p[key] }));

  const toggleOpts = [
    { key: "aiEditor", label: "AI Editor" }, { key: "imageEdit", label: "Image Edit" },
    { key: "textEdit", label: "Text Edit" }, { key: "colors", label: "Colors" },
    { key: "clipart", label: "Clipart" },
  ];

  return (
    <div className="bg-[#fdf8f4] min-h-screen box-border font-inter pt-4 pb-12">
      <div className="flex flex-wrap gap-4 justify-between items-start mb-7 px-2 md:px-0">
        <div>
          <h2 className="m-0 text-[18px] md:text-[24px] font-manrope font-extrabold text-[#6D0F1F]">Products List</h2>
          <p className="mt-1.5 mb-0 text-[16px] text-[#78716C] font-inter font-medium opacity-70">Manage and create your bespoke inventory collections.</p>
        </div>
        <div className="flex bg-[#fdf8f4] p-[5px] rounded-[16px] border border-[#f1d6d6] gap-[2px]">
          {["2D MODEL", "3D MODELS"].map(lbl => {
            const val = lbl === "2D MODEL" ? "2D" : "3D", active = type === val;
            return (
              <button key={lbl} onClick={() => setType(val)}
                className={`px-[12px] md:px-[20px] py-[7px] text-[12px] font-inter font-semibold tracking-[0.12em] rounded-[16px] border cursor-pointer transition-all duration-200 border ${active ? 'bg-white border-[#f1d6d6] text-[#6d0f1f] shadow-[0_1px_4px_rgba(109,15,31,.1)]' : 'bg-transparent border-transparent text-[#7a5a64]'}`}>
                {lbl}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-[28px] border border-[#fdf3f3] shadow-[0_1px_8px_rgba(109,15,31,.04)] overflow-hidden">
        <div className="flex items-center justify-between pt-4 px-6 pb-[14px] border-b border-[#fdf3f3] flex-wrap gap-3">
          <div className="flex items-center gap-[10px]">
            <div className="w-[17px] h-[17px] rounded border-2 border-[#f1d6d6]" />
            <span className="text-[12px] font-semibold text-[#57534E] font-inter tracking-[0.08em] uppercase">Bulk Select</span>
            <span className="text-[12px] text-[#A8A29E] font-medium opacity-90 ml-6.5">Showing 15 of 36 products</span>
          </div>
          <div className="flex gap-[18px] pr-2 items-center">
            <button className="bg-transparent border-none cursor-pointer text-[#A8A29E] hover:text-[#57534E] transition-colors p-0 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="7" y1="12" x2="17" y2="12"></line>
                <line x1="10" y1="17" x2="14" y2="17"></line>
              </svg>
            </button>
            <button className="bg-transparent border-none cursor-pointer text-[#A8A29E] hover:text-[#57534E] transition-colors p-0 flex items-center justify-center">
              <FiDownload size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="border-b text-[14px] font-inter text-[#A8A29E] font-semibold border-[#fdf3f3]">
                <TH ch="S.No" className="pl-[28px]  text-[13px] font-inter text-[#A8A29E] font-semibold text-left" />
                <TH ch="Image" className="text-left  text-[13px] font-inter text-[#A8A29E] font-semibold" />
                <TH ch="Product Name" className="text-left  text-[13px] font-inter text-[#A8A29E] font-semibold" />
                <TH ch="SKU" className="text-left  text-[13px] font-inter text-[#A8A29E] font-semibold" />
                <TH ch="Status" className="text-center  text-[13px] font-inter text-[#A8A29E] font-semibold" />
                <TH ch="Actions" className="text-right pr-[28px]  text-[13px] font-inter text-[#A8A29E] font-semibold" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} className={`group hover:bg-[#fdf8f4]/45 transition-colors ${i < rows.length - 1 ? 'border-b border-[#fdf3f3]' : ''}`}>
                  <td className="py-[18px] pr-[14px] pl-[28px] text-[13px] font-semibold text-[#7a5a64] opacity-35">{r.id}</td>
                  <td className="p-[18px]"><Thumb src={r.image} /></td>
                  <td className="p-[18px]">
                    <p className="m-0 text-[14px] font-bold font-manrope text-[#6D0F1F]">{r.name}</p>
                    <p className="mt-[7px] mb-0 text-[11px] font-right text-[#A8A29E] tracking-[0.12em] opacity-90 uppercase">{r.sub}</p>
                  </td>
                  <td className="p-[18px]">
                    <span className="bg-[#fdf8f4]  rounded-[7px] py-1 px-[9px] text-[10px] font-bold text-[#57534E] whitespace-nowrap">{r.sku}</span>
                  </td>
                  <td className="p-[18px]">
                    <div className="flex items-center justify-center gap-[10px]">
                      <Toggle on={r.on} onChange={() => toggleRow(r.id)} />
                      <span className="text-[10px] font-bold text-[#7a5a64] tracking-[0.1em] uppercase min-w-[38px]">{r.on ? "Unhide" : "Hide"}</span>
                    </div>
                  </td>
                  <td className="py-[18px] pl-[14px] pr-[28px] text-right relative">
                    <button onClick={() => setMenu(menu === r.id ? null : r.id)}
                      className="bg-transparent border-none cursor-pointer text-[#7a5a64] p-1.5 rounded-lg inline-flex items-center hover:bg-[#fdf8f4] transition-colors">
                      <FiMoreHorizontal size={20} />
                    </button>
                    {menu === r.id && (
<<<<<<< HEAD
                      <div ref={menuRef} className="absolute right-[52px] top-3 z-[200] bg-[#FFFFFF] border border-[#DDC0C0] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] w-[256px] h-[205px] flex flex-col py-3 overflow-hidden text-left">
                        <MenuItem icon={<DropdownIcons.Settings />} label="Edit Tab Settings" onClick={() => { setModal(true); setMenu(null); }} />
                        <MenuItem icon={<DropdownIcons.Palette />} label="Customize Data" onClick={() => setMenu(null)} />
                        <MenuItem icon={<DropdownIcons.Image />} label="Customize Image" onClick={() => setMenu(null)} />
                        <div className="mx-6 my-1 border-b border-[#f1f1f1] flex-shrink-0" />
                        <MenuItem icon={<DropdownIcons.Resize />} label="Set Width & Height" onClick={() => setMenu(null)} />
=======
                      <div ref={menuRef} style={{ position:"absolute", right:52, top:12, zIndex:200, background:C.white, border:`1px solid ${C.border}`, borderRadius:18, boxShadow:"0 8px 32px rgba(109,15,31,.13)", padding:"6px 0", minWidth:186 }}>
                        <MenuItem icon={<FiSettings size={13}/>}  label="Edit Tab Settings" onClick={() => { setModal(true); setMenu(null); }} />
<MenuItem 
      icon={<FiDatabase size={13}/>}  
      label="Customize Data"    
      onClick={() => {
        setMenu(null);
        // Navigates to: /products/[productId]
        // This will open your productId/page.js (The Variant Cards)
        router.push(`/products/${r.id}`); 
      }} 
    />
                       <MenuItem icon={<FiImage size={13}/>}     label="Customize Image"   onClick={() => setMenu(null)} />
                        <MenuItem icon={<FiMaximize2 size={13}/>} label="Set Width & Height" onClick={() => setMenu(null)} />
>>>>>>> f12dc1c4e92766e8b6ab90df2c36b69b67e34c0d
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-4 pb-4 px-7 border-t border-[#fdf3f3] flex-wrap gap-3">
          <span className="text-[12px] text-[#7a5a64] font-medium">Showing <b className="text-[#6d0f1f]">1–4</b> of <b className="text-[#6d0f1f]">128</b> products</span>
          <div className="flex gap-1.5 items-center">
            <PageBtn onClick={() => setPage(p => Math.max(1, p - 1))}><FiChevronLeft size={14} /></PageBtn>
            {[1, 2, 3, "…", 12].map((p, i) => (
              <PageBtn key={i} active={p === page} onClick={() => typeof p === "number" && setPage(p)}>{p}</PageBtn>
            ))}
            <PageBtn onClick={() => setPage(p => Math.min(12, p + 1))}><FiChevronRight size={14} /></PageBtn>
          </div>
        </div>
      </div>
      {modal && (
        <div onClick={() => setModal(false)}
          className="fixed inset-0 z-[300] bg-[#1a060a]/20 flex items-center justify-center p-[12px] md:p-[32px]">
          <div onClick={e => e.stopPropagation()}
            className="bg-[#FFFFFF] rounded-[12px] shadow-[0px_20px_40px_0px_rgba(109,15,31,0.06)] w-[520px] h-[600px] max-w-[95vw] max-h-[95vh] relative flex flex-col box-border overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-[32px] pt-[24px] pb-[20px] border-b border-[#f1f1f1]">
              <div className="flex items-center gap-[14px]">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#fdf3f3] text-[#6d0f1f] flex items-center justify-center flex-shrink-0">
                  <FiSettings size={18} />
                </div>
                <h3 className="m-0 text-[18px] leading-[26px] font-bold text-[#6D0F1F] font-inter">Edit Product Settings</h3>
              </div>
              <button onClick={() => setModal(false)} className="bg-transparent border-none cursor-pointer text-[#57534E] hover:opacity-70 transition-opacity flex items-center justify-center p-1">
                <FiX size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Body */}
            <div className="px-[32px] py-[24px] flex flex-col flex-1">
              <div className="flex items-center mb-[20px]">
                <span className="text-[11px] font-bold text-[#8c827a] tracking-[0.1em] uppercase w-[130px] font-inter">Product Type</span>
                <div className="flex bg-[#fdf3f3] p-[4px] rounded-[8px] gap-1">
                  {["2D","3D"].map(t => {
                    const active = type === t;
                    return (
                      <button key={t} onClick={() => setType(t)}
                        className={`px-[30px] py-[7px] text-[12px] font-bold rounded-[6px] border-none cursor-pointer transition-all duration-200 ${active ? 'bg-[#6D0F1F] text-white shadow-sm' : 'bg-transparent text-[#8c827a] hover:bg-[#f4ebe8]/80'}`}>
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-[12px] flex-1">
                {toggleOpts.map(({ key, label }) => {
                  const on = opts[key];
                  return (
                    <div key={key} onClick={() => toggleOpt(key)}
                      className={`flex items-center gap-[16px] rounded-[12px] py-[14px] px-[20px] cursor-pointer transition-all duration-200 ${on ? 'bg-[#FCF8F8]' : 'bg-[#FAFAFA]'}`}>
                      <Toggle on={on} onChange={e => { e?.stopPropagation?.(); toggleOpt(key); }} />
                      <span className={`text-[14px] font-bold ${on ? 'text-[#6D0F1F]' : 'text-[#A8A29E]'}`}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-[32px] pb-[32px] pt-3 bg-[#FFFFFF]">
              <button onClick={() => setModal(false)}
                className="w-full h-[52px] bg-[#6D0F1F] hover:bg-[#4D0A15] active:scale-[0.98] text-white border-none rounded-[12px] text-[14px] font-bold cursor-pointer flex items-center justify-center gap-[10px] transition-all duration-200 shadow-[0_8px_24px_rgba(109,15,31,.25)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Update Product Settings
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}