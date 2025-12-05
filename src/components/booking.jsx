import { useGetbookingQuery } from "../Bothfeatures/features2/api/tenant";
import { CheckCircle, XCircle, Calendar, CreditCard, User2, Hash } from "lucide-react";

export default function Booking() {
  const { data, isLoading } = useGetbookingQuery();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  const bookings = data?.userdetails;

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        No booking records found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Your Booking History</h1>

      {bookings.map((item, index) => (
        <BookingCard key={index} booking={item} />
      ))}
    </div>
  );
}

function BookingCard({ booking }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">

      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Hash className="w-5 h-5" /> Booking ID: {booking._id}
        </h2>
        <p className="opacity-90 text-sm mt-1">
          {new Date(booking.date).toLocaleString()}
        </p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">

        {/* Status */}
        <StatusBadge status={booking.tilldatestatus} />

        {/* Grid Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Detail label="Tenant ID" value={booking.tenantId} icon={<User2 />} />
          <Detail label="Branch" value={booking.branch} />
          <Detail label="Amount Paid" value={`₹${booking.amountpaid}`} icon={<CreditCard />} />
          <Detail label="Payment Mode" value={booking.mode} />
          <Detail label="Advance Till Date" value={booking.tilldateAdvance} />
          <Detail label="Dues Till Date" value={booking.tilldatedues} />
          <Detail label="Razorpay Order ID" value={booking.razorpay_order_id} />
          <Detail label="Razorpay Payment ID" value={booking.razorpay_payment_id} />
          <Detail label="Signature" value={booking.razorpay_signature} />

        </div>
      </div>
    </div>
  );
}

/* ========================= COMPONENTS ============================== */

function Detail({ label, value, icon }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
        {icon} {label}
      </span>
      <span className="text-base font-semibold text-gray-800 break-words">
        {value || "—"}
      </span>
    </div>
  );
}

function StatusBadge({ status }) {
  const isPaid = status?.toLowerCase() === "paid";

  return (
    <div className="flex items-center gap-2">
      {isPaid ? (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ) : (
        <XCircle className="w-5 h-5 text-red-600" />
      )}

      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          isPaid
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
