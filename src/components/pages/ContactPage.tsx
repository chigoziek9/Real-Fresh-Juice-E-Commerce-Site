import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#79cd47] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-4">Get in Touch</h1>
          <p className="text-xl">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center shadow-lg bg-white">
              <div className="w-12 h-12 bg-[#79cd47] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">Visit Us</h3>
              <p className="text-sm text-gray-600">
                123 Fresh Street
                <br />
                City, State 12345
              </p>
            </Card>
            <Card className="p-6 text-center shadow-lg bg-white">
              <div className="w-12 h-12 bg-[#fa8906] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">Call Us</h3>
              <p className="text-sm text-gray-600">
                +1 (555) 123-4567
                <br />
                Mon-Fri, 8am-6pm
              </p>
            </Card>
            <Card className="p-6 text-center shadow-lg bg-white">
              <div className="w-12 h-12 bg-[#79cd47] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">Email Us</h3>
              <p className="text-sm text-gray-600">
                hello@freshlife.com
                <br />
                support@freshlife.com
              </p>
            </Card>
            <Card className="p-6 text-center shadow-lg bg-white">
              <div className="w-12 h-12 bg-[#fa8906] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">Business Hours</h3>
              <p className="text-sm text-gray-600">
                Mon-Fri: 7am - 8pm
                <br />
                Sat-Sun: 8am - 6pm
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl mb-6">Send Us a Message</h2>
              {submitted ? (
                <Card className="p-8 text-center bg-[#79cd47]/10 border-[#79cd47]">
                  <div className="w-16 h-16 bg-[#79cd47] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
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
                    <Label htmlFor="email">Email Address</Label>
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
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#79cd47] hover:bg-[#79cd47]/90"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Map and Additional Info */}
            <div>
              <h2 className="text-3xl mb-6">Find Us</h2>
              {/* Map placeholder */}
              <Card className="mb-6 overflow-hidden">
                <div className="h-[400px] bg-gray-200 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4">More Ways to Connect</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>
                    <strong className="text-black">Customer Support:</strong> Available Monday-Friday, 8am-6pm EST
                  </li>
                  <li>
                    <strong className="text-black">Wholesale Inquiries:</strong> wholesale@freshlife.com
                  </li>
                  <li>
                    <strong className="text-black">Press & Media:</strong> press@freshlife.com
                  </li>
                  <li>
                    <strong className="text-black">Careers:</strong> careers@freshlife.com
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="mb-2">What are your delivery hours?</h3>
                <p className="text-gray-600">
                  We deliver Monday through Friday from 9am to 6pm, and Saturday from 10am to 4pm. Orders placed before 2pm are eligible for same-day delivery.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="mb-2">Do you offer bulk or corporate orders?</h3>
                <p className="text-gray-600">
                  Yes! We offer special pricing for bulk and corporate orders. Please email wholesale@freshlife.com or call us for more information.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="mb-2">Are your products really 100% organic?</h3>
                <p className="text-gray-600">
                  Absolutely! All our ingredients are certified organic and sourced from trusted local farms. We never use preservatives or artificial ingredients.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="mb-2">What is your return policy?</h3>
                <p className="text-gray-600">
                  We want you to be completely satisfied. If you're not happy with your order, contact us within 24 hours and we'll make it right.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
