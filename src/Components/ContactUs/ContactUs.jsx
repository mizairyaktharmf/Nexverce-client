import { useState } from 'react';
import { Mail, Linkedin, Instagram, Facebook, Clock, CheckCircle2, Send, Sparkles, MessageCircle } from 'lucide-react';
import Footer from '../Footer/Footer';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

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
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Animated Blob Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 border-b border-gray-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <Badge variant="premium" className="mb-6 shadow-lg hover:shadow-xl transition-shadow">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Get in{" "}
              <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We'd Love to Hear from You
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

            {/* Left Side - Contact Information */}
            <div>
              <Card className="mb-8 shadow-xl border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardTitle className="text-2xl bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">Contact Information</CardTitle>
                  <CardDescription className="mt-2">
                    Have questions, feedback, or partnership inquiries? Reach out to us through any of the channels below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <a
                        key={index}
                        href={method.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all group hover:scale-105"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{method.title}</h3>
                          <p className="text-sm text-gray-600">{method.info}</p>
                        </div>
                      </a>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="shadow-xl border-2 border-primary/10 hover:shadow-2xl transition-all">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <CardTitle className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">Business Hours</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-6">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full"></div>
                    <p className="text-gray-700 font-medium">Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full"></div>
                    <p className="text-gray-700 font-medium">Saturday - Sunday: Closed</p>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 rounded-lg mt-4">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <p className="text-sm text-primary font-semibold">We typically respond within 24-48 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Contact Form */}
            <Card className="shadow-2xl border-2 border-primary/20 hover:shadow-xl transition-all">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardTitle className="text-2xl bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">Send Us a Message</CardTitle>
                <CardDescription className="mt-2">Fill out the form below and we'll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {submitted && (
                  <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg text-green-700 mb-6 shadow-md">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="font-medium">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
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

                  <Button type="submit" variant="premium" size="lg" className="w-full shadow-lg hover:shadow-xl transition-all">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="shadow-2xl border-2 border-primary/10 hover:shadow-xl transition-all">
            <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-blue-50">
              <Badge variant="premium" className="mb-4 shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                FAQ
              </Badge>
              <CardTitle className="text-3xl md:text-4xl">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                  Questions
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-3">{faq.question}</h3>
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
