import { Shield, Lock, Eye, Users, Globe, FileText, Mail, Phone } from 'lucide-react';
import Footer from '../Footer/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

function PrivacyPolicy() {
  const sections = [
    {
      id: 1,
      icon: FileText,
      title: "Introduction",
      content: (
        <>
          <p className="mb-4">
            Welcome to Nexverce ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.nexverce.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">www.nexverce.com</a> and use our services.
          </p>
          <p>
            By accessing or using Nexverce, you agree to the terms outlined in this Privacy Policy. If you do not agree with our practices, please do not use our services.
          </p>
        </>
      )
    },
    {
      id: 2,
      icon: Eye,
      title: "Information We Collect",
      subsections: [
        {
          subtitle: "2.1 Personal Information",
          content: (
            <>
              <p className="mb-3">We may collect the following personal information when you:</p>
              <ul className="space-y-2">
                <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Register an account:</strong> Name, email address, username, and password</span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Subscribe to newsletters:</strong> Email address</span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Contact us:</strong> Name, email address, and message content</span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Use social features:</strong> Profile information, preferences, and activity data</span></li>
              </ul>
            </>
          )
        },
        {
          subtitle: "2.2 Automatically Collected Information",
          content: (
            <>
              <p className="mb-3">When you visit our website, we automatically collect certain information, including:</p>
              <ul className="space-y-2">
                <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, referral sources</span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Cookies:</strong> Small data files stored on your device to enhance user experience</span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Analytics:</strong> Aggregated data about website performance and user behavior</span></li>
              </ul>
            </>
          )
        },
        {
          subtitle: "2.3 Third-Party Integrations",
          content: (
            <>
              <p className="mb-3">When you connect third-party services (such as LinkedIn), we may collect:</p>
              <ul className="space-y-2">
                <li className="flex gap-2"><span className="text-primary">•</span><span>Profile information from the connected service</span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span>Access tokens required for integration features</span></li>
                <li className="flex gap-2"><span className="text-primary">•</span><span>Usage data related to integrated features</span></li>
              </ul>
            </>
          )
        }
      ]
    },
    {
      id: 3,
      icon: Users,
      title: "How We Use Your Information",
      content: (
        <>
          <p className="mb-3">We use the collected information for the following purposes:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: "Service Delivery", desc: "Provide, operate, and maintain our platform" },
              { title: "User Experience", desc: "Personalize content and improve website functionality" },
              { title: "Communication", desc: "Send updates, newsletters, and respond to inquiries" },
              { title: "Analytics", desc: "Understand usage patterns and improve our services" },
              { title: "Security", desc: "Protect against fraud, abuse, and unauthorized access" },
              { title: "Legal Compliance", desc: "Comply with applicable laws and regulations" },
              { title: "Marketing", desc: "Send promotional materials (with your consent)" }
            ].map((item, index) => (
              <div key={index} className="flex gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-gray-200">
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-primary rounded-full"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    },
    {
      id: 4,
      icon: Globe,
      title: "Third-Party Services",
      subsections: [
        {
          subtitle: "4.1 LinkedIn Integration",
          content: (
            <p>
              We use LinkedIn OAuth for authentication and content sharing features. When you connect your LinkedIn account, LinkedIn's Privacy Policy applies to information shared with them.
            </p>
          )
        },
        {
          subtitle: "4.2 Analytics Services",
          content: (
            <p>
              We use analytics services (such as Google Analytics) to understand website traffic and user behavior. These services may use cookies and tracking technologies.
            </p>
          )
        },
        {
          subtitle: "4.3 Payment Processors",
          content: (
            <p>
              If we process payments, we use secure third-party payment processors. We do not store full credit card information on our servers.
            </p>
          )
        }
      ]
    },
    {
      id: 5,
      icon: Shield,
      title: "Data Sharing and Disclosure",
      content: (
        <>
          <p className="mb-3">We do not sell your personal information. We may share your information in the following circumstances:</p>
          <ul className="space-y-2">
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our platform</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span><strong>Safety and Security:</strong> To protect the rights, property, or safety of Nexverce, our users, or others</span></li>
          </ul>
        </>
      )
    },
    {
      id: 6,
      icon: Lock,
      title: "Data Security",
      content: (
        <>
          <p className="mb-3">
            We implement industry-standard security measures to protect your personal information, including:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex gap-2"><span className="text-primary">•</span><span>Encryption of data in transit (HTTPS/SSL)</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span>Secure authentication and authorization protocols</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span>Regular security audits and vulnerability assessments</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span>Access controls and employee training on data protection</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span>Secure backup and disaster recovery procedures</span></li>
          </ul>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </div>
        </>
      )
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
            <Badge variant="premium" className="mb-2">Last Updated: December 16, 2025</Badge>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

          {/* Main Sections */}
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{section.id}. {section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-700 leading-relaxed">
                  {section.content}
                  {section.subsections && (
                    <div className="mt-4 space-y-4">
                      {section.subsections.map((subsection, index) => (
                        <div key={index} className="pl-4 border-l-2 border-primary/20">
                          <h3 className="font-semibold text-gray-900 mb-2">{subsection.subtitle}</h3>
                          {subsection.content}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* Your Privacy Rights */}
          <Card className="shadow-lg border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">7. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p className="mb-4">Depending on your location, you may have the following rights:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {[
                  { title: "Access", desc: "Request a copy of the personal information we hold about you" },
                  { title: "Correction", desc: "Request correction of inaccurate or incomplete information" },
                  { title: "Deletion", desc: "Request deletion of your personal information" },
                  { title: "Opt-Out", desc: "Unsubscribe from marketing communications" },
                  { title: "Data Portability", desc: "Request your data in a structured, machine-readable format" },
                  { title: "Restriction", desc: "Request restriction of processing under certain circumstances" }
                ].map((right, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{right.title}</h4>
                      <p className="text-sm text-gray-700">{right.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm">
                To exercise these rights, please contact us at <a href="mailto:contact@nexverce.com" className="text-primary hover:underline font-semibold">contact@nexverce.com</a>
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">8. Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p className="mb-4">
                We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings. Types of cookies we use:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "Essential Cookies", desc: "Required for website functionality" },
                  { title: "Analytics Cookies", desc: "Help us understand how you use our site" },
                  { title: "Preference Cookies", desc: "Remember your settings and preferences" },
                  { title: "Marketing Cookies", desc: "Used for targeted advertising (with your consent)" }
                ].map((cookie, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">{cookie.title}</h4>
                    <p className="text-sm text-gray-700">{cookie.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">9. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 text-sm">
                <p>
                  Nexverce is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">10. International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 text-sm">
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable laws.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">11. Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 text-sm">
                <p>
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">12. Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 text-sm">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <Card className="shadow-xl bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">13. Contact Us</CardTitle>
              <p className="text-gray-600 mt-2">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  { icon: Mail, label: "Email", value: "contact@nexverce.com", link: "mailto:contact@nexverce.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", link: "tel:+15551234567" }
                ].map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={index}
                      href={method.link}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-gray-600 font-medium">{method.label}</p>
                        <p className="text-sm text-gray-900 font-semibold">{method.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Consent */}
          <Card className="shadow-lg border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">14. Consent</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>
                By using Nexverce, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
