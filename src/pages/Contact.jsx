import { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { shopConfig } from '../data/config';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate inquiry form submission
    console.log('Contact form data submitted:', formData);
    setFormSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] text-brand-600 uppercase tracking-[0.2em] font-semibold block mb-2">
            Connect
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-medium mb-3">
            Contact & Visit Us
          </h1>
          <p className="text-stone-500 font-light text-sm max-w-md mx-auto">
            Have questions about sizes, fabrics, custom orders or shipping? We are here to help.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Column: Coordinates Cards (LG: 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-100 p-8 rounded-sm shadow-xs space-y-8">
              <h2 className="font-serif text-2xl text-stone-900 font-medium pb-4 border-b border-stone-100">
                Store Location
              </h2>

              {/* Address */}
              <div className="flex gap-4 items-start">
                <MapPin className="w-6 h-6 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-medium text-stone-950 text-base mb-1">Our Address</h4>
                  <p className="text-stone-600 font-light text-sm leading-relaxed">{shopConfig.contact.address}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 items-start">
                <Clock className="w-6 h-6 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-medium text-stone-950 text-base mb-1">Opening Hours</h4>
                  <p className="text-stone-600 font-light text-sm leading-relaxed">{shopConfig.contact.openingHours}</p>
                </div>
              </div>

              {/* Contacts */}
              <div className="flex gap-4 items-start">
                <Phone className="w-6 h-6 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-medium text-stone-950 text-base mb-1">Contact Info</h4>
                  <p className="text-stone-600 font-light text-sm mb-1">
                    Call: <a href={`tel:${shopConfig.contact.phone}`} className="hover:text-brand-700 font-normal transition-colors">{shopConfig.contact.phone}</a>
                  </p>
                  <p className="text-stone-600 font-light text-sm">
                    WhatsApp: <a href={`https://wa.me/${shopConfig.contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 font-normal transition-colors">{shopConfig.contact.phone}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${shopConfig.contact.phone}`}
                className="flex items-center justify-center gap-2 p-4 bg-white border border-stone-200 hover:border-brand-500 hover:text-brand-700 text-stone-700 font-semibold text-xs uppercase tracking-wider transition-all rounded-sm text-center shadow-xs"
              >
                <Phone className="w-4 h-4 text-brand-600" />
                Call Store
              </a>
              <a
                href={`https://wa.me/${shopConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs uppercase tracking-wider transition-all rounded-sm text-center shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form (LG: 7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-stone-100 p-8 rounded-sm shadow-xs h-full">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                  <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-2">Message Sent</h3>
                  <p className="text-stone-500 font-light text-sm max-w-sm mx-auto mb-6">
                    Thank you for your inquiry. Our boutique representatives will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', message: '' });
                    }}
                    className="px-6 py-2.5 bg-stone-950 hover:bg-brand-600 text-white text-xs font-semibold tracking-widest uppercase transition-colors rounded-sm"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-2xl text-stone-900 font-medium mb-6">
                    Inquire Online
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:outline-none focus:border-brand-500 focus:bg-white text-stone-850 text-sm transition-all rounded-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Your phone number"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:outline-none focus:border-brand-500 focus:bg-white text-stone-850 text-sm transition-all rounded-xs"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="yourname@example.com"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:outline-none focus:border-brand-500 focus:bg-white text-stone-850 text-sm transition-all rounded-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                        Message / Request
                      </label>
                      <textarea
                        id="message"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write down the details of products you are looking for..."
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:outline-none focus:border-brand-500 focus:bg-white text-stone-850 text-sm transition-all rounded-xs"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-stone-900 hover:bg-brand-650 text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-luxury rounded-sm shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}
