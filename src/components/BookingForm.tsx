import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ShinyButton } from "@/components/ui/shiny-button";
import { toast } from "sonner";

interface BookingFormProps {
  chaletName?: string;
}

const BookingForm = ({ chaletName }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = "https://formspree.io/f/myzdkayl";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          message: formData.message,
          chaletName: chaletName ?? undefined,
          source: "booking",
        }),
      });
      if (!res.ok) throw new Error("Form submission failed");
      toast.success("Booking inquiry sent successfully! We'll contact you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: "1",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Unable to send booking right now. Please try again later.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-card">
      <h3 className="text-2xl font-bold mb-6 text-emerald-600 dark:text-emerald-400">
        {chaletName ? `Book ${chaletName}` : "Make a Booking Inquiry"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-emerald-600 dark:text-emerald-400">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-emerald-600 dark:text-emerald-400">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-emerald-600 dark:text-emerald-400">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+962 77 123 4567"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="checkIn" className="text-emerald-600 dark:text-emerald-400">Check-in Date</Label>
            <Input
              id="checkIn"
              name="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="checkOut" className="text-emerald-600 dark:text-emerald-400">Check-out Date</Label>
            <Input
              id="checkOut"
              name="checkOut"
              type="date"
              value={formData.checkOut}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="guests" className="text-emerald-600 dark:text-emerald-400">Number of Guests</Label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <Label htmlFor="message" className="text-emerald-600 dark:text-emerald-400">Special Requests (Optional)</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any special requirements or questions?"
            rows={4}
          />
        </div>
        
        <ShinyButton type="submit" className="w-full text-emerald-800 dark:text-emerald-200 border border-emerald-300/40 bg-emerald-50/40">
          Send Booking Inquiry
        </ShinyButton>
      </form>
    </div>
  );
};

export default BookingForm;