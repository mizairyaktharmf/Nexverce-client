import { useState } from 'react';
import { Mail, Linkedin, Instagram, Facebook, Clock, CheckCircle2, Send } from 'lucide-react';
import Footer from '../Footer/Footer';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can add API call to send the contact form
    console.log('Contact Form Submitted:', formData);

    // Show success message
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      info: "contact@nexverce.com",
      link: "mailto:contact@nexverce.com"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      info: "linkedin.com/company/nexverce",
      link: "https://www.linkedin.com/company/nexverce"
    },
    {
      icon: Instagram,
      title: "Instagram",
      info: "@nexverce",
      link: "https://www.instagram.com/nexverce"
    },
    {
      icon: Facebook,
      title: "Facebook",
      info: "facebook.com/nexverce",
      link: "https://www.facebook.com/nexverce"
    }
  ];

  const faqs = [
    {
      question: "What is Nexverce?",
      answer: "Nexverce is a digital platform that curates innovative products, services, and content across various industries to help businesses and consumers make informed decisions."
    },
    {
      question: "How can I list my product?",
      answer: "Please email us at contact@nexverce.com with details about your product or service, and our team will review your submission."
    },
    {
      question: "Do you offer business partnerships?",
      answer: "Yes! We're always open to collaborating with innovative businesses. Contact us to discuss partnership opportunities."
    },
    {
      question: "How do I report an issue?",
      answer: "If you encounter any technical issues or have concerns, please email us with details, and our support team will assist you promptly."
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We'd Love to Hear from You</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

            {/* Left Side - Contact Information */}
            <div>
              <Card className="mb-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                  <CardDescription>
                    Have questions, feedback, or partnership inquiries? Reach out to us through any of the channels below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <a
                        key={index}
                        href={method.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-gray-200 hover:shadow-md transition-all group"
                      >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{method.title}</h3>
                          <p className="text-sm text-gray-600">{method.info}</p>
                        </div>
                      </a>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <CardTitle>Business Hours</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
                  <p className="text-gray-700">Saturday - Sunday: Closed</p>
                  <p className="text-sm text-primary font-medium mt-4">We typically respond within 24-48 hours</p>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Contact Form */}
            <Card className="shadow-xl border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent>
                {submitted && (
                  <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 mb-6">
                    <CheckCircle2 className="h-5 w-5" />
                    <p>Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows="6"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <Button type="submit" variant="premium" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
