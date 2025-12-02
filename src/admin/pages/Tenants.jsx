// import { useState, useEffect } from "react";
// import { Plus, Search, Eye, FileText, Download, UserX } from "lucide-react";
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from "react-redux";

// import {
//   useAddTenantMutation,
//   useChangeStatusQuery,
//   useGetStatusQuery,

//   useGetAllTenantQuery
// } from "../../Bothfeatures/features2/api/tenant"

// import {
//   useGetAllBranchbybranchIdQuery
// } from "../../Bothfeatures/features2/api/propertyapi"


// export default function Tenants() {
//   const user = useSelector((state) => state.auth.user);
//   const { data: alldata } = useGetAllBranchbybranchIdQuery()
//   console.log("user", user)
//   const navigate = useNavigate()
//   const [addTenant, { data, isSuccess, refetch }] = useAddTenantMutation();
//   const { data: tenantdata, refetch: datarefetch } = useGetAllTenantQuery();
//   const [tenant, settenant] = useState(null)

//   const [adding, setadding] = useState(false);
//   const [formdata, setformdata] = useState({
//     contactNumber: "",
//     name: "",
//     Rent: "",
//     dues: "",
//     advanced: "",
//     idProof: "",
//     idProofType: "",
//     emergencyContactNumber: "",
//     documentsPhoto: "",
//     roomNumber: "",
//     branch: ""
//   })
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [selectedTenant, setSelectedTenant] = useState(null);
//   const { data: tenantStatusData, isFetching, isError } = useChangeStatusQuery(selectedTenant, {
//     skip: !selectedTenant,
//   });
//   const { data: statusdata } = useGetStatusQuery(filter);

//   const DetailofTenant = (id) => {
//     navigate(`/tenaantdetail/${id}`)
//   }



//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setformdata((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Save button
//   const handleSaveTenant = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("🏠 Property Data:", formdata);
//       await addTenant(formdata).unwrap();
//       console.log("🏠 Property Data:", formdata);
//       console.log(data)

//       setadding(false);
//       setformdata(' ')

//     } catch (error) {
//       console.log(error)

//     }


//   };

//   const handleChangestatus = async (e) => {

//     setFilter(e)

//   }



//   useEffect(() => {
//     console.log("📡 Fetching tenants from backend...");
//     if (!isSuccess) {
//       console.log(data?.message);
//     }
//     if (datarefetch) {
//       datarefetch();
//     }
//     if (statusdata) {
//       settenant(statusdata?.statususer)
//       console.log(statusdata?.statususer)
//     }
//     if (alldata) {
//       console.log("alldata", alldata?.allbranch)
//     }


//   }, [isSuccess, tenantStatusData, statusdata, alldata, datarefetch]);

//   const handleAddTenant = () => {
//     setadding(true)
//   };



//   // ✅ Checkout Tenant (DELETE simulation)
//   const handleCheckoutTenant = (tenantId) => {
//     console.log(`🚪 Initiating check-out for tenant ID: ${tenantId}`);
//     // Placeholder: simulate DELETE /tenants/:id
//     setSelectedTenant(tenantId);
//   };


//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//         <div>
//           <h1 className="text-[#1e3a5f] text-3xl font-bold">
//             Tenant Management
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Manage tenant profiles, documents, and check-ins/outs efficiently
//           </p>
//         </div>

//         {user?.role === "branch-manager" && (
//           <button
//             onClick={handleAddTenant}
//             className="flex items-center gap-2 bg-[#ff6b35] text-white px-8 py-3 rounded-xl 
//       font-medium hover:bg-[#e55a2b] shadow-md hover:shadow-lg transition-all"
//           >
//             <Plus size={20} />
//             Add Tenant
//           </button>
//         )}
//       </div>



//       {/* Filters */}
//       <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
//         <div className="flex flex-col lg:flex-row gap-4 items-center">

//           {/* Search Bar */}
//           <div className="flex-1 relative w-full">
//             <Search
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               size={20}
//             />

//             <input
//               type="text"
//               placeholder="Search tenants by name, phone, or room number..."
//               value={searchQuery}
//               onChange={(e) => {
//                 console.log("🔍 Search query:", e.target.value);
//                 setSearchQuery(e.target.value);
//               }}
//               className="
//           w-full pl-12 pr-4 py-3 
//           rounded-xl 
//           bg-white shadow-sm 
//           border border-gray-300 
//           focus:outline-none 
//           focus:ring-4 
//           focus:ring-[#1e3a5f]/20 
//           focus:border-[#1e3a5f]
//           transition-all duration-300
//         "
//             />
//           </div>

//           {/* Filter Dropdown */}
//           <div className="w-full lg:w-auto">
//             <select
//               value={filter}
//               onChange={(e) => handleChangestatus(e.target.value)}
//               className="
//           px-4 py-3 rounded-xl 
//           border border-gray-300 
//           bg-white shadow-sm
//           focus:outline-none 
//           focus:ring-4 
//           focus:ring-[#1e3a5f]/20 
//           focus:border-[#1e3a5f]
//           transition-all duration-300
//           cursor-pointer
//         "
//             >
//               <option value="all">All Tenants</option>
//               <option value="Active">Active</option>
//               <option value="In-Active">In-Active</option>
//             </select>
//           </div>

//         </div>
//       </div>


//       {/* Adding tenant */}
//       {adding && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">

//           <div className="bg-white/90 shadow-2xl rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-white/40">

//             {/* Header */}
//             <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-8 py-5 rounded-t-2xl shadow-sm">
//               <h2 className="text-3xl font-semibold text-[#1e3a5f]">
//                 Add New Tenant
//               </h2>
//               <p className="text-gray-500 text-sm mt-1">
//                 Fill all the details correctly before saving
//               </p>
//             </div>

//             {/* Form Content */}
//             <div className="px-8 py-6 space-y-5">

//               {/* Name */}
//               <div>
//                 <label className="form-label">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formdata.name}
//                   onChange={handleChange}
//                   placeholder="Tenant Name"
//                   className="form-input"
//                 />
//               </div>

//               {/* Contact */}
//               <div>
//                 <label className="form-label">Contact Number</label>
//                 <input
//                   type="number"
//                   name="contactNumber"
//                   value={formdata.contactNumber}
//                   onChange={handleChange}
//                   placeholder="Enter contact number"
//                   className="form-input"
//                 />
//               </div>

//               {/* Rent & Dues */}
//               <div className="grid grid-cols-2 gap-5">
//                 <div>
//                   <label className="form-label">Rent</label>
//                   <input
//                     type="number"
//                     name="Rent"
//                     value={formdata.Rent}
//                     onChange={handleChange}
//                     placeholder="Monthly Rent"
//                     className="form-input"
//                   />
//                 </div>
//                 <div>
//                   <label className="form-label">Dues</label>
//                   <input
//                     type="number"
//                     name="dues"
//                     value={formdata.dues}
//                     onChange={handleChange}
//                     placeholder="Pending Dues"
//                     className="form-input"
//                   />
//                 </div>
//               </div>

//               {/* Advance */}
//               <div>
//                 <label className="form-label">Advance Payment</label>
//                 <input
//                   type="number"
//                   name="advanced"
//                   value={formdata.advanced}
//                   onChange={handleChange}
//                   placeholder="Advance amount paid"
//                   className="form-input"
//                 />
//               </div>

//               {/* ID Proof */}
//               <div className="grid grid-cols-2 gap-5">
//                 <div>
//                   <label className="form-label">ID Proof Type</label>
//                   <input
//                     type="text"
//                     name="idProofType"
//                     value={formdata.idProofType}
//                     onChange={handleChange}
//                     placeholder="Aadhaar, PAN, etc."
//                     className="form-input"
//                   />
//                 </div>

//                 <div>
//                   <label className="form-label">ID Proof Number</label>
//                   <input
//                     type="text"
//                     name="idProof"
//                     value={formdata.idProof}
//                     onChange={handleChange}
//                     placeholder="Enter ID proof number"
//                     className="form-input"
//                   />
//                 </div>
//               </div>

//               {/* Emergency Contact */}
//               <div>
//                 <label className="form-label">Emergency Contact Number</label>
//                 <input
//                   type="number"
//                   name="emergencyContactNumber"
//                   value={formdata.emergencyContactNumber}
//                   onChange={handleChange}
//                   placeholder="Enter emergency contact number"
//                   className="form-input"
//                 />
//               </div>

//               {/* Room Number */}
//               <div>
//                 <label className="form-label">Room Number</label>
//                 <input
//                   type="text"
//                   name="roomNumber"
//                   value={formdata.roomNumber}
//                   onChange={handleChange}
//                   placeholder="Enter room number"
//                   className="form-input"
//                 />
//               </div>

//               {/* Branch Select */}
//               <div>
//                 <label className="form-label">Select Branch</label>
//                 <select
//                   name="branch"
//                   value={formdata.branch}
//                   onChange={handleChange}
//                   className="form-input"
//                 >
//                   <option value="">Select Branch</option>
//                   {alldata?.allbranch?.map((branch) => (
//                     <option key={branch._id} value={branch._id}>
//                       {branch.address}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* File Upload */}
//               <div>
//                 <label className="form-label">Documents / Photo</label>
//                 <input
//                   type="file"
//                   name="documentsPhoto"
//                   onChange={(e) =>
//                     setformdata({ ...formdata, documentsPhoto: e.target.files[0] })
//                   }
//                   className="form-input"
//                 />
//               </div>
//             </div>

//             {/* Footer Buttons */}
//             <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t px-8 py-5 flex gap-4 shadow-md rounded-b-2xl">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSaveTenant}
//                 className="flex-1 py-3 bg-[#ff6b35] text-white rounded-xl hover:bg-[#e25a2d] shadow-md transition"
//               >
//                 Save Tenant
//               </button>
//             </div>
//           </div>
//         </div>
//       )}




//       {/* Table */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
//         {tenant?.map((t) => (
//           <div
//             key={t._id}
//             className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 p-6
//                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
//           >
//             {/* Header */}
//             <div className="flex items-center gap-4 mb-5">
//               <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
//                         flex items-center justify-center text-2xl font-bold shadow-lg">
//                 {t.name.charAt(0)}
//               </div>

//               <div>
//                 <p className="text-xl font-bold text-gray-900">{t.name}</p>
//                 <p className="text-sm text-gray-500">Room {t.roomNumber}</p>
//               </div>
//             </div>

//             {/* Divider */}
//             <hr className="border-gray-200 mb-4" />

//             {/* Information */}
//             <div className="space-y-3 text-sm">
//               <p className="flex justify-between">
//                 <span className="text-gray-500">Contact:</span>
//                 <span className="font-semibold">{t.contactNumber}</span>
//               </p>

//               <p className="flex justify-between">
//                 <span className="text-gray-500">Emergency:</span>
//                 <span className="font-semibold">{t.emergencyContactNumber}</span>
//               </p>

//               <p className="flex justify-between">
//                 <span className="text-gray-500">Rent:</span>
//                 <span className="font-bold text-indigo-700">₹{t.Rent.toLocaleString()}</span>
//               </p>

//               <p className="flex justify-between">
//                 <span className="text-gray-500">Security Deposit:</span>
//                 <span className="font-semibold">₹{t.securitydeposit}</span>
//               </p>

//               <p className="flex justify-between">
//                 <span className="text-gray-500">Dues:</span>
//                 <span
//                   className={`font-bold ${t.dues > 0 ? "text-red-600" : "text-green-600"
//                     }`}
//                 >
//                   ₹{t.dues}
//                 </span>
//               </p>

//               <p className="flex justify-between">
//                 <span className="text-gray-500">ID Proof:</span>
//                 <span className="font-semibold">{t.idProofType}: {t.idProof}</span>
//               </p>

//               <p className="flex justify-between">
//                 <span className="text-gray-500">Status:</span>
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold ${t.status === "Active"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-600"
//                     }`}
//                 >
//                   {t.status}
//                 </span>
//               </p>

//               <p className="flex justify-between">
//                 <span className="text-gray-500">Payment:</span>
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold ${t.paymentstatus === "paid"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-yellow-100 text-yellow-700"
//                     }`}
//                 >
//                   {t.paymentstatus}
//                 </span>
//               </p>

//               {/* Check-in / Check-out */}
//               <div className="mt-3">
//                 <p className="text-gray-500 text-sm">Check-In:</p>
//                 <p className="font-medium text-gray-900">
//                   {new Date(t.checkInDate).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </p>

//                 {t.checkedoutdate && (
//                   <>
//                     <p className="text-gray-500 text-sm mt-2">Check-Out:</p>
//                     <p className="font-medium text-red-600">
//                       {new Date(t.checkedoutdate).toLocaleDateString("en-IN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </p>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-3 mt-6">
//               <button
//                 onClick={() => DetailofTenant(t._id)}
//                 className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 
//                      hover:shadow-lg transition-all duration-300"
//               >
//                 View Details
//               </button>

//               {t.status === "Active" ? (
//                 <button
//                   onClick={() => handleCheckoutTenant(t._id)}
//                   className="flex-1 py-2.5 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 
//                        hover:shadow-lg transition-all duration-300"
//                 >
//                   Check-Out
//                 </button>
//               ) : (
//                 <button
//                   disabled
//                   className="flex-1 py-2.5 bg-gray-200 text-gray-500 rounded-xl shadow"
//                 >
//                   Inactive
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>




//     </div>
//   );
// }
import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search, Eye, FileText, Download, UserX, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";

import {
  useAddTenantMutation,
  useChangeStatusQuery,
  useGetStatusQuery,
  useGetAllTenantQuery,
} from "../../Bothfeatures/features2/api/tenant";

import { useGetAllBranchbybranchIdQuery } from "../../Bothfeatures/features2/api/propertyapi";

/**
 * Tenants page — improved, complete & responsive
 *
 * Notes:
 * - This file expects your existing RTK Query hooks to work as before.
 * - Mutations don't return refetch; queries do. We use tenantRefetch from useGetAllTenantQuery.
 */

export default function Tenants() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Branches list (for select)
  const { data: alldata } = useGetAllBranchbybranchIdQuery();

  // Tenants list (query gives refetch)
  const {
    data: tenantdata,
    isLoading: tenantsLoading,
    isError: tenantsError,
    refetch: tenantRefetch,
  } = useGetAllTenantQuery();

  // Add tenant mutation
  const [addTenant, { isLoading: addingTenant, isSuccess: addSuccess, error: addError }] =
    useAddTenantMutation();

  // Status queries (example use)
  // keep changeStatusQuery usage as-is if that hook returns something useful
  const [selectedTenant, setSelectedTenant] = useState(null);
  const { data: tenantStatusData } = useChangeStatusQuery(selectedTenant, {
    skip: !selectedTenant,
  });

  // Status filtered list (server side)
  const [filter, setFilter] = useState("all");
  const { data: statusdata } = useGetStatusQuery(filter);

  // Modal & form state
  const [adding, setAdding] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    contactNumber: "",
    Rent: "",
    dues: "",
    advanced: "",
    idProof: "",
    idProofType: "",
    emergencyContactNumber: "",
    documentsPhoto: null,
    roomNumber: "",
    branch: "",
  });

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Tenant list to render (from statusdata if filtering server-side else from tenantdata)
  const tenantsList = useMemo(() => {
    if (filter && filter !== "all" && statusdata?.statususer) {
      return statusdata.statususer;
    }
    return tenantdata?.tenants || [];
  }, [filter, statusdata, tenantdata]);

  // Derived filtered (client-side search)
  const filteredTenants = useMemo(() => {
    if (!searchQuery.trim()) return tenantsList;
    const q = searchQuery.toLowerCase();
    return tenantsList.filter((t) => {
      return (
        t.name?.toLowerCase().includes(q) ||
        String(t.contactNumber)?.toLowerCase().includes(q) ||
        String(t.roomNumber)?.toLowerCase().includes(q)
      );
    });
  }, [tenantsList, searchQuery]);

  // form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "documentsPhoto") {
      setFormdata((prev) => ({ ...prev, documentsPhoto: files?.[0] ?? null }));
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormdata({
      name: "",
      contactNumber: "",
      Rent: "",
      dues: "",
      advanced: "",
      idProof: "",
      idProofType: "",
      emergencyContactNumber: "",
      documentsPhoto: null,
      roomNumber: "",
      branch: "",
    });
  };

  // Save tenant (send JSON + file via FormData if file present)
  const handleSaveTenant = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formdata.name || !formdata.contactNumber || !formdata.roomNumber || !formdata.branch) {
      toast.error("Please fill required fields: name, contact, room, branch.");
      return;
    }

    try {
      // if documentsPhoto present -> use FormData, else send JSON
      if (formdata.documentsPhoto) {
        const fd = new FormData();
        Object.keys(formdata).forEach((k) => {
          if (formdata[k] === null || formdata[k] === undefined) return;
          if (k === "documentsPhoto") fd.append("documentsPhoto", formdata.documentsPhoto);
          else fd.append(k, formdata[k]);
        });

        // RTK mutation should handle FormData at endpoint
        await addTenant(fd).unwrap();
      } else {
        // send JSON object
        const payload = { ...formdata };
        await addTenant(payload).unwrap();
      }

      toast.success("Tenant added");
      setAdding(false);
      resetForm();
      // refetch tenants
      tenantRefetch?.();
    } catch (err) {
      console.error("Add tenant error:", err);
      toast.error(err?.data?.message || "Failed to add tenant");
    }
  };

  // Handle filter change
  const handleChangestatus = (value) => {
    setFilter(value);
  };

  // Checkout (example: will set selectedTenant to call change status query)
  const handleCheckoutTenant = (tenantId) => {
    setSelectedTenant(tenantId);
    // If you have a mutation for checkout, call it here instead
    toast.success("Checkout triggered (simulate) — implement real API as needed.");
  };

  // Effects: show add success toast if mutation indicates success (RTK handles isSuccess too)
  useEffect(() => {
    if (addSuccess) {
      tenantRefetch?.();
    }
  }, [addSuccess, tenantRefetch]);

  // format price safely
  const formatCurrency = (v) => {
    if (v == null) return "-";
    const num = Number(v) || 0;
    return num.toLocaleString("en-IN");
  };

  // Simple Tenant Card subcomponent
  const TenantCard = ({ t }) => {
    return (
      <div
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
        key={t._id}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl font-bold shadow">
            {t.name?.charAt(0) ?? "U"}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-lg text-gray-800">{t.name}</p>
            <p className="text-sm text-gray-500">Room {t.roomNumber}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-500">Contact</span>
            <span className="font-medium">{t.contactNumber || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Emergency</span>
            <span className="font-medium">{t.emergencyContactNumber || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Rent</span>
            <span className="font-bold text-indigo-700">₹{formatCurrency(t.Rent)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Dues</span>
            <span className={`font-bold ${t.dues > 0 ? "text-red-600" : "text-green-600"}`}>
              ₹{formatCurrency(t.dues)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">ID Proof</span>
            <span className="font-medium">{t.idProofType ? `${t.idProofType}: ${t.idProof}` : "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                t.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {t.status || "Unknown"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${t.paymentstatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              {t.paymentstatus || "unknown"}
            </span>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => navigate(`/tenaantdetail/${t._id}`)}
            className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow"
          >
            View Details
          </button>

          {t.status === "Active" ? (
            <button
              onClick={() => handleCheckoutTenant(t._id)}
              className="flex-1 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow"
            >
              Check-Out
            </button>
          ) : (
            <button disabled className="flex-1 py-2.5 bg-gray-200 text-gray-500 rounded-lg">
              Inactive
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 px-4 md:px-8 pb-12">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-[#1e3a5f] text-2xl md:text-3xl font-bold">Tenant Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage tenant profiles, documents and check-ins/outs</p>
        </div>

        {user?.role === "branch-manager" && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 bg-[#ff6b35] text-white px-4 md:px-6 py-2.5 rounded-xl font-medium hover:bg-[#e55a2b] shadow-md"
          >
            <Plus size={18} /> Add Tenant
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white/90 rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tenants by name, phone, or room number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-4 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] outline-none"
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => handleChangestatus(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-4 focus:ring-[#1e3a5f]/20 outline-none"
            >
              <option value="all">All Tenants</option>
              <option value="Active">Active</option>
              <option value="In-Active">In-Active</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Tenant Modal */}
      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] border">
            <div className="sticky top-0 bg-white px-6 py-4 border-b rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#1e3a5f]">Add New Tenant</h2>
                  <p className="text-sm text-gray-500 mt-1">Fill all the details correctly before saving</p>
                </div>
                <button onClick={() => setAdding(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X size={18} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveTenant} className="px-6 py-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input name="name" value={formdata.name} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" placeholder="Tenant name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                  <input name="contactNumber" value={formdata.contactNumber} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" placeholder="Contact number" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rent</label>
                  <input name="Rent" value={formdata.Rent} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" placeholder="Monthly rent" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dues</label>
                  <input name="dues" value={formdata.dues} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" placeholder="Pending dues" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Advance Payment</label>
                  <input name="advanced" value={formdata.advanced} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" placeholder="Advance amount" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                  <input name="emergencyContactNumber" value={formdata.emergencyContactNumber} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" placeholder="Emergency contact number" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Proof Type</label>
                  <select name="idProofType" value={formdata.idProofType} onChange={handleChange} className="w-full border rounded-xl px-4 py-2">
                    <option value="">Select ID Proof</option>
                    <option value="Aadhar-Card">Aadhar Card</option>
                    <option value="Voter-Id-Card">Voter ID Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Proof Number</label>
                  <input name="idProof" value={formdata.idProof} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" placeholder="ID number" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Number *</label>
                  <input name="roomNumber" value={formdata.roomNumber} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" placeholder="Room number" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Branch *</label>
                  <select name="branch" value={formdata.branch} onChange={handleChange} className="w-full border rounded-xl px-4 py-2">
                    <option value="">Select branch</option>
                    {alldata?.allbranch?.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.address}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Documents / Photo</label>
                  <input type="file" name="documentsPhoto" onChange={handleChange} className="w-full" />
                  {formdata.documentsPhoto && (
                    <p className="text-sm text-gray-500 mt-2">Selected: {formdata.documentsPhoto.name}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => { setAdding(false); resetForm(); }} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" disabled={addingTenant} className="px-6 py-2 bg-[#ff6b35] text-white rounded-xl shadow hover:bg-[#e25a2d]">
                  {addingTenant ? "Saving..." : "Save Tenant"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tenant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenantsLoading ? (
          <div className="col-span-full text-center py-8">Loading tenants...</div>
        ) : tenantsError ? (
          <div className="col-span-full text-center py-8 text-red-500">Failed to load tenants.</div>
        ) : filteredTenants.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">No tenants found</div>
        ) : (
          filteredTenants.map((t) => <TenantCard key={t._id} t={t} />)
        )}
      </div>
    </div>
  );
}
