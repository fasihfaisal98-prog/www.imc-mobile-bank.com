import React, { useState } from "react";
import Papa from "papaparse";
import { useStore } from "../../context/StoreContext";
import { saveProduct } from "../../services/storageService";
import { Download, Upload, CheckCircle2, AlertCircle, FileSpreadsheet, ArrowRight } from "lucide-react";

export const AdminBulkImport = () => {
  const { refreshData, brands } = useStore();

  const [parsedRows, setParsedRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [successCount, setSuccessCount] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDownloadSample = () => {
    const csvContent = 
`name,brand,ram,storage,price,oldPrice,dealerPrice,display,battery,mainCamera,selfieCamera,chipset,network
Samsung Galaxy A27 5G,Samsung,8GB,256GB,119999,129999,112000,6.7" Super AMOLED 120Hz,5000mAh 25W,50MP OIS,13MP,Exynos 1480,5G Dual SIM
Infinix Hot 70 Pro 5G,Infinix,8GB,128GB,86999,92999,80500,6.78" Curved AMOLED 120Hz,6000mAh 45W,108MP,32MP,Dimensity 7020,5G Dual SIM
Tecno Camon 50 Pro,Tecno,8GB,256GB,109999,119999,102000,6.78" Curved AMOLED 144Hz,6500mAh 70W,50MP Sony LYT-700C,50MP,Helio G200 Ultimate,4G LTE
nubia V80 MAX,Nubia / ZTE,8+12GB,256GB,48999,53999,45000,6.9" 120Hz,6000mAh Bypass,50MP AI,16MP,Octa-Core,4G LTE`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "imc_mobile_bank_products_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg("");
    setSuccessCount(null);
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          setParsedRows(results.data);
        } else {
          setErrorMsg("The selected CSV file appears to be empty.");
        }
      },
      error: (err) => {
        setErrorMsg("Failed to read CSV file: " + err.message);
      }
    });
  };

  const handleConfirmImport = async () => {
    if (parsedRows.length === 0) return;
    setIsImporting(true);

    try {
      let count = 0;
      for (const row of parsedRows) {
        if (!row.name || !row.price) continue;

        const brandLower = (row.brand || "Samsung").toLowerCase();
        let matchedBrand = brands.find(b => b.slug.toLowerCase().includes(brandLower) || b.name.toLowerCase().includes(brandLower));
        if (!matchedBrand) {
          matchedBrand = { slug: brandLower.replace(/\s+/g, "-"), name: row.brand || "Samsung" };
        }

        const priceNum = Number(String(row.price).replace(/[^0-9]/g, "")) || 0;
        const oldPriceNum = row.oldPrice ? Number(String(row.oldPrice).replace(/[^0-9]/g, "")) : null;
        const dealerPriceNum = row.dealerPrice ? Number(String(row.dealerPrice).replace(/[^0-9]/g, "")) : null;
        const slug = row.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

        const newProd = {
          id: `prod_${Date.now()}_${count}`,
          name: row.name.trim(),
          slug: slug,
          brandId: matchedBrand.slug,
          brandName: matchedBrand.name,
          price: priceNum,
          oldPrice: oldPriceNum,
          dealerPrice: dealerPriceNum,
          inStock: true,
          sortOrder: 50 + count,
          tags: ["New Arrival"],
          images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"],
          variants: [
            {
              id: "v1",
              ram: row.ram || "8GB",
              storage: row.storage || "256GB",
              price: priceNum,
              oldPrice: oldPriceNum,
              inStock: true
            }
          ],
          colors: [{ name: "Standard Black", hex: "#0f172a" }],
          specs: {
            display: row.display || "AMOLED Screen",
            battery: row.battery || "5000mAh",
            mainCamera: row.mainCamera || "50MP",
            selfieCamera: row.selfieCamera || "16MP",
            chipset: row.chipset || "Octa-core",
            network: row.network || "PTA Approved"
          },
          highlights: [
            "Official Box Pack with Brand Warranty",
            "PTA Approved Sealed Unit",
            "Purchased from Authorized IMC Mobile Bank Hyderabad"
          ],
          description: `${row.name} available in stock at IMC Mobile Bank Saddar Cantt Hyderabad.`
        };

        await saveProduct(newProd);
        count++;
      }

      await refreshData();
      setSuccessCount(count);
      setParsedRows([]);
      setFileName("");
    } catch (err) {
      setErrorMsg("Error during bulk import: " + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Bulk CSV Phone Import
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Upload phone lists from distributors or spreadsheets and import multiple phones in seconds.
        </p>
      </div>

      {/* Download Sample & Upload Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Download Sample */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Step 1: Download CSV Template</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Use our pre-formatted template with columns for Model Name, Brand, RAM, Storage, Price, and Specs.
            </p>
          </div>

          <button
            onClick={handleDownloadSample}
            className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Sample CSV Template</span>
          </button>
        </div>

        {/* Step 2: Upload File */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Step 2: Upload Filled CSV File</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Select your completed spreadsheet to review and validate before adding to your store.
            </p>
          </div>

          <label className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-center">
            <FileSpreadsheet className="w-4 h-4" />
            <span>{fileName ? `File: ${fileName}` : "Select CSV File from Computer"}</span>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Success Notification */}
      {successCount !== null && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <strong className="font-bold">Import Complete!</strong>
            <p className="text-emerald-700 mt-0.5">
              Successfully imported {successCount} phone models into your store catalog.
            </p>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Preview Table before Import */}
      {parsedRows.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                CSV Preview ({parsedRows.length} Rows Detected)
              </h3>
              <p className="text-xs text-slate-500">
                Please verify the columns below before confirming import.
              </p>
            </div>

            <button
              onClick={handleConfirmImport}
              disabled={isImporting}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-md"
            >
              <span>{isImporting ? "Importing Phones..." : `Confirm & Import ${parsedRows.length} Phones`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto max-h-96 rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] sticky top-0">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Model Name</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">RAM</th>
                  <th className="p-3">Storage</th>
                  <th className="p-3">Public Price</th>
                  <th className="p-3">Dealer Price</th>
                  <th className="p-3">Battery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {parsedRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-bold text-slate-900">{row.name || "—"}</td>
                    <td className="p-3 text-slate-700">{row.brand || "—"}</td>
                    <td className="p-3 text-slate-600">{row.ram || "—"}</td>
                    <td className="p-3 text-slate-600">{row.storage || "—"}</td>
                    <td className="p-3 font-bold text-blue-600">{row.price || "—"}</td>
                    <td className="p-3 font-mono text-slate-500">{row.dealerPrice || "—"}</td>
                    <td className="p-3 text-slate-500">{row.battery || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
