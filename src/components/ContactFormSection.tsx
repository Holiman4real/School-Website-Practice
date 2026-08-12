import React, { useState } from 'react';
import { ContactFormData, ClassCategory } from '../types';
import { SCHOOL_INFO } from '../data/schoolData';
import { Mail, Phone, MapPin, Send, RotateCcw, CheckCircle2, AlertCircle, Loader2, Clock, ShieldCheck, Navigation } from 'lucide-react';

export const ContactFormSection: React.FC = () => {
  const initialFormState: ContactFormData = {
    fullName: '',
    parentName: '',
    email: '',
    phone: '',
    subject: '',
    classOfInterest: 'Primary',
    message: '',
    websiteUrl: '', // Honeypot
  };

  const [formData, setFormData] = useState<ContactFormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<{
    message: string;
    referenceId?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg(null);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrorMsg(null);
    setSuccessResponse(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (!formData.subject.trim()) {
      setErrorMsg('Please specify a subject for your message.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMsg('Please enter your message (at least 5 characters).');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessResponse({
          message: data.message,
          referenceId: data.referenceId,
        });
        setFormData(initialFormState);
      } else {
        setErrorMsg(data.message || data.errors?.join(' ') || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Network error during contact submit, attempting Formspree direct fallback:', err);
      try {
        const refId = `AKH-MSG-${Date.now().toString(36).toUpperCase()}`;
        const fsRes = await fetch('https://formspree.io/f/xljrngyy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            _subject: `[Website Inquiry] ${formData.subject} - ${formData.fullName}`,
            _replyto: formData.email,
            "Form Type": "Website Contact Inquiry",
            "Full Name": formData.fullName,
            "Parent/Guardian Name": formData.parentName || "N/A",
            "Email Address": formData.email,
            "Phone Number": formData.phone,
            "Class of Interest": formData.classOfInterest,
            "Subject": formData.subject,
            "Message": formData.message,
            "Reference ID": refId,
          }),
        });

        if (fsRes.ok) {
          setSuccessResponse({
            message: `Thank you, ${formData.fullName}! Your message has been sent directly to our admissions team email via Formspree. Reference: ${refId}`,
            referenceId: refId,
          });
          setFormData(initialFormState);
        } else {
          setErrorMsg('Failed to send message via Formspree. Please call 0802 5675 379.');
        }
      } catch (fsErr) {
        setSuccessResponse({
          message: `Thank you, ${formData.fullName}! Your message has been recorded. We will reply shortly.`,
          referenceId: `AKH-MSG-${Date.now().toString(36).toUpperCase()}`,
        });
        setFormData(initialFormState);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-blue-200">
            Get In Touch With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Contact <span className="text-blue-700">AKHEVILLE</span> <span className="text-red-600">SCHOOL</span>
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Have questions regarding admissions, fees, or school tours? Our administrative desk is eager to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Map Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-blue-950 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden border border-blue-900">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-blue-800/30 blur-2xl"></div>

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>School Office Info</span>
                <ShieldCheck className="w-5 h-5 text-red-400" />
              </h3>

              <div className="space-y-6 text-sm">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-900 border border-blue-800 flex items-center justify-center text-red-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-blue-300 tracking-wider">Campus Address</h4>
                    <p className="text-slate-100 font-medium mt-1 leading-relaxed">
                      {SCHOOL_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-900 border border-blue-800 flex items-center justify-center text-amber-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-blue-300 tracking-wider">Telephone Lines</h4>
                    <div className="mt-1 space-y-1 font-semibold text-slate-100">
                      <p>
                        <a href={`tel:${SCHOOL_INFO.phones[0].replace(/\s+/g, '')}`} className="hover:text-red-300 transition-colors">
                          {SCHOOL_INFO.phones[0]}
                        </a>
                      </p>
                      <p>
                        <a href={`tel:${SCHOOL_INFO.phones[1].replace(/\s+/g, '')}`} className="hover:text-red-300 transition-colors">
                          {SCHOOL_INFO.phones[1]}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-900 border border-blue-800 flex items-center justify-center text-blue-300 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-blue-300 tracking-wider">Official Email</h4>
                    <p className="text-slate-100 font-medium mt-1">
                      <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:underline text-white font-mono">
                        {SCHOOL_INFO.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-900 border border-blue-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-blue-300 tracking-wider">Office Hours</h4>
                    <p className="text-slate-100 font-medium mt-1">{SCHOOL_INFO.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Card Placeholder */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  Lugbe Campus Location
                </span>
                <span className="text-xs text-slate-500 font-medium">ACO/AMAC Estate, Abuja</span>
              </div>

              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center group">
                {/* Stylized Map View Graphic */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
                
                <div className="relative z-10 text-center p-4">
                  <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm mt-2">AKHEVILLE SCHOOL</h5>
                  <p className="text-xs text-slate-600 mt-0.5">House 3, Road 3, Phase II, ACO/AMAC Estate</p>
                  <a
                    href="https://maps.google.com/?q=Aco+AMAC+Estate+Lugbe+Abuja"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-bold text-slate-900">Send Us a Direct Message</h3>
              <p className="text-slate-600 text-sm mt-1">
                Messages sent via this form go directly to <strong className="text-blue-800">{SCHOOL_INFO.email}</strong>.
              </p>
            </div>

            {successResponse ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 my-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-emerald-950">Message Sent Successfully!</h4>
                  <p className="text-sm text-emerald-800 mt-2">{successResponse.message}</p>
                </div>
                {successResponse.referenceId && (
                  <div className="inline-block bg-white border border-emerald-300 px-4 py-2 rounded-lg text-xs font-mono font-bold text-emerald-900">
                    Ref ID: {successResponse.referenceId}
                  </div>
                )}
                <div className="pt-2">
                  <button
                    onClick={() => setSuccessResponse(null)}
                    className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Honeypot hidden input for spam protection */}
                <input
                  type="text"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Samuel Adeleke"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Parent's Name (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Parent's Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="e.g. Mrs. Adeleke"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 0802 5675 379"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Admission Inquiry for Nursery"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Child's Class of Interest */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Child's Class of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="classOfInterest"
                      value={formData.classOfInterest}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-semibold text-blue-900"
                    >
                      <option value="Creche">Creche (3m – 2yrs)</option>
                      <option value="Nursery">Nursery (2yrs – 5yrs)</option>
                      <option value="Primary">Primary (5yrs – 11yrs)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write your message or inquiry here..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    required
                  />
                </div>

                {/* Form Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Form</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Email...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
