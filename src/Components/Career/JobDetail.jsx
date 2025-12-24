import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, Send, CheckCircle2, Briefcase } from 'lucide-react';
import Footer from '../Footer/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import BlockRenderer from '../BlockRenderer';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function to format salary with currency
const formatSalary = (careerDetails) => {
  if (!careerDetails || !careerDetails.salaryAmount) {
    return 'Competitive';
  }

  const currencySymbols = {
    USD: '$',
    AED: 'AED ',
    LKR: 'LKR ',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    AUD: 'A$',
    CAD: 'C$'
  };

  const symbol = currencySymbols[careerDetails.salaryCurrency] || careerDetails.salaryCurrency + ' ';
  const amount = parseInt(careerDetails.salaryAmount).toLocaleString();

  const typeLabel = {
    yearly: '/year',
    monthly: '/month',
    hourly: '/hour',
    range: '',
    competitive: ''
  };

  if (careerDetails.salaryType === 'competitive') {
    return 'Competitive';
  }

  return `${symbol}${amount}${typeLabel[careerDetails.salaryType] || ''}`;
};

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job details from API
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/landing-pages/slug/${id}`);

        if (!response.ok) {
          // Try fetching by ID if slug fails
          const responseById = await fetch(`${API_BASE_URL}/landing-pages/${id}`);
          if (!responseById.ok) {
            throw new Error('Job not found');
          }
          const responseData = await responseById.json();
          const data = responseData.data || responseData; // Handle wrapped response

          if (data.category && data.category.toLowerCase() !== 'career') {
            throw new Error('Not a career post');
          }

          setJob(transformJobData(data));
        } else {
          const responseData = await response.json();
          const data = responseData.data || responseData; // Handle wrapped response

          console.log('Fetched job detail:', data); // Debug log

          if (data.category && data.category.toLowerCase() !== 'career') {
            throw new Error('Not a career post');
          }

          setJob(transformJobData(data));
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError(err.message);
        // Fallback to default jobs
        const defaultJob = getDefaultJobs().find(j => j.id.toString() === id);
        if (defaultJob) {
          setJob(defaultJob);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // Transform landing page data to job format
  const transformJobData = (data) => {
    // Extract description from contentBlocks if metaDescription is empty
    let description = data.metaDescription || '';
    if (!description && data.contentBlocks && data.contentBlocks.length > 0) {
      const firstBlock = data.contentBlocks[0];
      if (firstBlock.type === 'paragraph' && firstBlock.data?.text) {
        description = firstBlock.data.text;
      }
    }

    return {
      id: data._id || data.id,
      title: data.title,
      department: data.category || 'General',
      location: data.careerDetails?.jobLocation || 'Remote',
      type: data.careerDetails?.jobType || 'Full-time',
      salary: formatSalary(data.careerDetails),
      description: description || 'Exciting opportunity to join our team!',
      contentBlocks: data.contentBlocks || [],
      slug: data.slug,
      gradient: 'from-purple-500 to-pink-500',
      careerDetails: data.careerDetails
    };
  };

  // Default/fallback job listings
  const getDefaultJobs = () => [
    {
      id: 1,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote / Hybrid',
      type: 'Full-time',
      salary: '$80,000 - $120,000',
      description: 'Join our engineering team to build cutting-edge web applications using React, Node.js, and modern technologies. You\'ll work on exciting projects that impact thousands of users worldwide.',
      responsibilities: [
        'Design and develop scalable web applications using React, Node.js, and MongoDB',
        'Collaborate with cross-functional teams to define and implement new features',
        'Write clean, maintainable, and well-documented code',
        'Participate in code reviews and mentor junior developers',
        'Optimize applications for maximum speed and scalability',
        'Stay up-to-date with emerging technologies and industry trends'
      ],
      requirements: [
        '3+ years of experience with React and Node.js',
        'Strong understanding of RESTful APIs and databases',
        'Experience with Git, Docker, and CI/CD pipelines',
        'Excellent problem-solving and communication skills',
        'Bachelor\'s degree in Computer Science or related field (or equivalent experience)'
      ],
      niceToHave: [
        'Experience with TypeScript',
        'Knowledge of AWS or other cloud platforms',
        'Familiarity with microservices architecture',
        'Open source contributions'
      ],
      benefits: [
        'Competitive salary and equity',
        'Flexible work hours',
        'Health, dental, and vision insurance',
        'Professional development budget ($2,000/year)',
        '401(k) matching',
        'Unlimited PTO',
        'Work-from-home equipment allowance'
      ],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Graphic Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$60,000 - $90,000',
      description: 'Create stunning visual designs for our brand, marketing materials, and digital products. You\'ll have the creative freedom to shape the visual identity of Nexverce.',
      responsibilities: [
        'Design marketing materials, social media graphics, and brand assets',
        'Create UI/UX designs for web and mobile applications',
        'Maintain and evolve our brand guidelines',
        'Collaborate with marketing and product teams',
        'Present design concepts and iterate based on feedback',
        'Ensure consistency across all visual touchpoints'
      ],
      requirements: [
        '2+ years of professional design experience',
        'Proficiency in Adobe Creative Suite (Photoshop, Illustrator, Figma)',
        'Strong portfolio showcasing creative work',
        'Understanding of UI/UX principles',
        'Excellent attention to detail'
      ],
      niceToHave: [
        'Motion graphics and animation skills',
        'Experience with video editing',
        'Knowledge of HTML/CSS',
        'Illustration skills'
      ],
      benefits: [
        'Creative freedom',
        'Work-from-home setup allowance',
        'Unlimited PTO',
        'Team retreats',
        'Health insurance',
        'Professional development opportunities'
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Content Creator',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      salary: '$50,000 - $75,000',
      description: 'Craft engaging content across multiple platforms to grow our brand presence and audience. You\'ll be the voice of Nexverce across blogs, social media, and marketing campaigns.',
      responsibilities: [
        'Create compelling blog posts, articles, and web content',
        'Manage and grow social media presence across platforms',
        'Develop content strategies aligned with business goals',
        'Collaborate with design team on visual content',
        'Analyze content performance and optimize for engagement',
        'Stay current with content trends and best practices'
      ],
      requirements: [
        '2+ years of content creation experience',
        'Strong writing and storytelling skills',
        'Experience with SEO and social media marketing',
        'Video editing and graphic design skills are a plus',
        'Ability to write for different audiences and platforms'
      ],
      niceToHave: [
        'Experience with content management systems (WordPress, etc.)',
        'Photography or videography skills',
        'Knowledge of email marketing',
        'Analytics and data-driven mindset'
      ],
      benefits: [
        'Creative freedom',
        'Flexible schedule',
        'Content creation tools and equipment',
        'Growth opportunities',
        'Health insurance',
        'Remote work setup allowance'
      ],
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The position you're looking for doesn't exist.</p>
          <Button variant="premium" onClick={() => navigate('/careers')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/careers')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="premium" className="shadow-md">
                {job.department}
              </Badge>
              <Badge variant="outline">{job.type}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {job.title}
            </h1>

            {/* Job Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-bold">
                <DollarSign className="h-5 w-5" />
                <span>{job.salary}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Description */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">About the Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </CardContent>
              </Card>

              {/* Content Blocks from Admin (if available) */}
              {job.contentBlocks && job.contentBlocks.length > 0 ? (
                <Card className="shadow-xl">
                  <CardContent className="pt-6">
                    <BlockRenderer blocks={job.contentBlocks} />
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Fallback: Responsibilities */}
                  {job.responsibilities && (
                    <Card className="shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-2xl">Responsibilities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {job.responsibilities.map((resp, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Fallback: Requirements */}
                  {job.requirements && (
                    <Card className="shadow-xl border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-2xl">Requirements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Fallback: Nice to Have */}
                  {job.niceToHave && (
                    <Card className="shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-2xl">Nice to Have</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {job.niceToHave.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Fallback: Benefits */}
                  {job.benefits && (
                    <Card className="shadow-xl bg-gradient-to-br from-purple-50 to-blue-50">
                      <CardHeader>
                        <CardTitle className="text-2xl">Benefits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {job.benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm"
                            >
                              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <Card className="shadow-2xl border-2 border-primary">
                  <div className={`h-2 bg-gradient-to-r ${job.gradient}`}></div>
                  <CardHeader className="text-center">
                    <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-xl">Ready to Apply?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-gray-600">
                      Send your resume and portfolio to join our team!
                    </p>
                    <a href="mailto:contact@nexverce.com">
                      <Button variant="premium" size="lg" className="w-full shadow-lg hover:shadow-xl">
                        <Send className="mr-2 h-5 w-5" />
                        Apply Now
                      </Button>
                    </a>
                    <p className="text-sm text-gray-500">
                      Email:{" "}
                      <a
                        href="mailto:contact@nexverce.com"
                        className="text-primary hover:underline font-semibold"
                      >
                        contact@nexverce.com
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
