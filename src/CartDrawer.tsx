import { useState } from 'react';
import { useCart } from './CartContext';
import { categories } from './menuData';

interface CartDrawerProps {
  onClose: () => void;
}

export default function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowOrderForm(true);
  };

  const sendToWhatsApp = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('অনুগ্রহ করে আপনার নাম, ফোন নম্বর এবং ঠিকানা পূরণ করুন');
      return;
    }

    // অর্ডার মেসেজ তৈরি
    let message = `🍔 *নতুন অর্ডার - টেকআউট বনানী*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *গ্রাহকের তথ্য:*\n`;
    message += `• নাম: ${customerInfo.name}\n`;
    message += `• ফোন: ${customerInfo.phone}\n`;
    message += `• ঠিকানা: ${customerInfo.address}\n`;
    if (customerInfo.notes) {
      message += `• বিশেষ নির্দেশনা: ${customerInfo.notes}\n`;
    }
    message += `\n━━━━━━━━━━━━━━━━━━\n`;
    message += `🛒 *অর্ডারের বিবরণ:*\n\n`;

    items.forEach((cartItem, index) => {
      const categoryName = categories.find(c => c.id === cartItem.item.category)?.name || '';
      message += `${index + 1}. *${cartItem.item.name}*\n`;
      message += `   📂 ${categoryName}\n`;
      message += `   পরিমাণ: ${cartItem.quantity} টি\n`;
      message += `   দাম: ৳${cartItem.item.price} × ${cartItem.quantity} = ৳${cartItem.item.price * cartItem.quantity}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *মোট মূল্য: ৳${totalPrice}*\n`;
    message += `━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📍 ডেলিভারি ঠিকানা: ${customerInfo.address}\n`;
    message += `\n⏰ অর্ডারের সময়: ${new Date().toLocaleString('bn-BD')}\n`;
    message += `\nধন্যবাদ আপনার অর্ডারের জন্য! 🙏`;

    // WhatsApp URL তৈরি
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/8801847290010?text=${encodedMessage}`;

    // WhatsApp ওপেন করুন
    window.open(whatsappUrl, '_blank');

    // কার্ট ক্লিয়ার করুন
    clearCart();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 cart-overlay animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 cart-drawer animate-slide-in-right-3d flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-accent-3d flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">আপনার কার্ট</h2>
              <p className="text-[#888] text-xs">{totalItems} টি আইটেম</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl glass-light-3d flex items-center justify-center text-[#aaa] hover:text-white transition-colors fast-transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {!showOrderForm ? (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="text-6xl mb-4 animate-float-3d">🛒</div>
                  <h3 className="text-white font-semibold text-lg mb-2">আপনার কার্ট খালি</h3>
                  <p className="text-[#888] text-sm mb-6">মেনু থেকে আইটেম যোগ করুন</p>
                  <button
                    onClick={onClose}
                    className="bg-gradient-accent-3d text-white font-semibold px-6 py-3 rounded-xl category-3d"
                  >
                    মেনু দেখুন
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {items.map((cartItem) => (
                    <CartItemCard
                      key={cartItem.item.id}
                      item={cartItem}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <OrderForm
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
              onBack={() => setShowOrderForm(false)}
              onSubmit={sendToWhatsApp}
            />
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !showOrderForm && (
          <div className="border-t border-[#1a1a1a] p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#888] text-sm">মোট</span>
              <span className="text-white font-bold text-xl price-gradient-3d">৳{totalPrice}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-whatsapp text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 category-3d"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.64.075-.293-.149-1.23-.456-2.346-1.45-1.009-.996-1.691-2.226-1.888-2.522-.197-.297-.021-.458.148-.606.149-.134.33-.367.495-.55.165-.184.22-.315.33-.527.11-.212.056-.397-.028-.547-.084-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp এ অর্ডার করুন
            </button>
            <button
              onClick={clearCart}
              className="w-full text-[#888] text-sm py-2 hover:text-[#ff6b35] transition-colors fast-transition"
            >
              কার্ট খালি করুন
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// Cart Item Card
interface CartItemCardProps {
  item: { item: any; quantity: number };
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <div className="glass-light-3d rounded-xl p-3 flex gap-3">
      <img
        src={item.item.image}
        alt={item.item.name}
        className="w-20 h-20 rounded-lg object-cover"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-white font-semibold text-sm">{item.item.name}</h4>
          <p className="text-[#888] text-xs mt-0.5">৳{item.item.price} প্রতিটি</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.item.id, item.quantity - 1)}
              className="w-7 h-7 rounded-lg glass-3d flex items-center justify-center text-white qty-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="text-white font-semibold text-sm w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.item.id, item.quantity + 1)}
              className="w-7 h-7 rounded-lg bg-gradient-accent-3d flex items-center justify-center text-white qty-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">৳{item.item.price * item.quantity}</span>
            <button
              onClick={() => onRemove(item.item.id)}
              className="w-7 h-7 rounded-lg glass-3d flex items-center justify-center text-[#888] hover:text-red-500 transition-colors fast-transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Order Form
interface OrderFormProps {
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    notes: string;
  };
  setCustomerInfo: (info: any) => void;
  onBack: () => void;
  onSubmit: () => void;
}

function OrderForm({ customerInfo, setCustomerInfo, onBack, onSubmit }: OrderFormProps) {
  return (
    <div className="p-4 space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#888] text-sm hover:text-white transition-colors fast-transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        কার্টে ফিরে যান
      </button>

      <div>
        <h3 className="text-white font-bold text-lg mb-1">ডেলিভারি তথ্য</h3>
        <p className="text-[#888] text-xs">অর্ডার কনফার্ম করতে আপনার তথ্য পূরণ করুন</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-[#aaa] text-xs font-medium mb-1.5 block">আপনার নাম *</label>
          <input
            type="text"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            placeholder="আপনার পুরো নাম লিখুন"
            className="form-input-3d w-full glass-3d border border-[#333] rounded-xl px-4 py-3 text-white text-sm placeholder-[#555]"
          />
        </div>

        <div>
          <label className="text-[#aaa] text-xs font-medium mb-1.5 block">ফোন নম্বর *</label>
          <input
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            placeholder="০১XXXXXXXXX"
            className="form-input-3d w-full glass-3d border border-[#333] rounded-xl px-4 py-3 text-white text-sm placeholder-[#555]"
          />
        </div>

        <div>
          <label className="text-[#aaa] text-xs font-medium mb-1.5 block">ডেলিভারি ঠিকানা *</label>
          <textarea
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
            rows={3}
            className="form-input-3d w-full glass-3d border border-[#333] rounded-xl px-4 py-3 text-white text-sm placeholder-[#555] resize-none"
          />
        </div>

        <div>
          <label className="text-[#aaa] text-xs font-medium mb-1.5 block">বিশেষ নির্দেশনা (ঐচ্ছিক)</label>
          <textarea
            value={customerInfo.notes}
            onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
            placeholder="কোনো বিশেষ অনুরোধ থাকলে লিখুন"
            rows={2}
            className="form-input-3d w-full glass-3d border border-[#333] rounded-xl px-4 py-3 text-white text-sm placeholder-[#555] resize-none"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-[#1a1a1a]">
        <button
          onClick={onSubmit}
          className="w-full bg-gradient-whatsapp text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 category-3d"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.64.075-.293-.149-1.23-.456-2.346-1.45-1.009-.996-1.691-2.226-1.888-2.522-.197-.297-.021-.458.148-.606.149-.134.33-.367.495-.55.165-.184.22-.315.33-.527.11-.212.056-.397-.028-.547-.084-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp এ অর্ডার পাঠান
        </button>
        <p className="text-[#666] text-[10px] text-center mt-3">
          অর্ডার পাঠানোর পর আমরা আপনার সাথে যোগাযোগ করব
        </p>
      </div>
    </div>
  );
}
