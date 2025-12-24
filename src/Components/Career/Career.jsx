import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Search, Sparkles, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function Career() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);

  // Fetch career posts from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/landing-pages/careers/all`);

        if (!response.ok) {
          throw new Error('Failed to fetch career posts');
        }

        const responseData = await response.json();
        // The API returns an array directly for /careers/all endpoint
        const data = Array.isArray(responseData) ? responseData : [];

        console.log('Fetched career data:', data); // Debug log

        // Transform landing page data to job format
        const transformedJobs = data.map((lp) => {
          // Extract description from contentBlocks if metaDescription is empty
          let description = lp.metaDescription || '';
          if (!description && lp.contentBlocks && lp.contentBlocks.length > 0) {
            const firstBlock = lp.contentBlocks[0];
            if (firstBlock.type === 'paragraph' && firstBlock.data?.text) {
              description = firstBlock.data.text.substring(0, 150) + '...';
            }
          }

          return {
            id: lp._id,
            title: lp.title,
            department: lp.category || 'General',
            location: lp.careerDetails?.jobLocation || 'Remote',
            type: lp.careerDetails?.jobType || 'Full-time',
            salary: formatSalary(lp.careerDetails),
            description: description || 'Join our team and make an impact!',
            slug: lp.slug,
            gradient: getRandomGradient(),
            careerDetails: lp.careerDetails,
            contentBlocks: lp.contentBlocks || []
          };
        });

        setJobs(transformedJobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        // Fallback to default jobs if API fails
        setJobs(getDefaultJobs());
      }
    };

    fetchJobs();
  }, []);

  // Helper function to get random gradient for job cards
  const getRandomGradient = () => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-green-500 to-teal-500',
      'from-indigo-500 to-purple-500'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

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

  // Default/fallback job listings
  const getDefaultJobs = () => [
    {
      id: 1,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote / Hybrid',
      type: 'Full-time',
      salary: '$80,000 - $120,000',
      description: 'Join our engineering team to build cutting-edge web applications using React, Node.js, and modern technologies.',
      requirements: [
        '3+ years of experience with React and Node.js',
        'Strong understanding of RESTful APIs and databases',
        'Experience with Git, Docker, and CI/CD pipelines',
        'Excellent problem-solving and communication skills'
      ],
      benefits: [
        'Competitive salary and equity',
        'Flexible work hours',
        'Health insurance',
        'Professional development budget'
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
      description: 'Create stunning visual designs for our brand, marketing materials, and digital products.',
      requirements: [
        '2+ years of professional design experience',
        'Proficiency in Adobe Creative Suite (Photoshop, Illustrator, Figma)',
        'Strong portfolio showcasing creative work',
        'Understanding of UI/UX principles'
      ],
      benefits: [
        'Creative freedom',
        'Work-from-home setup allowance',
        'Unlimited PTO',
        'Team retreats'
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
      description: 'Craft engaging content across multiple platforms to grow our brand presence and audience.',
      requirements: [
        '2+ years of content creation experience',
        'Strong writing and storytelling skills',
        'Experience with SEO and social media marketing',
        'Video editing and graphic design skills are a plus'
      ],
      benefits: [
        'Creative freedom',
        'Flexible schedule',
        'Content creation tools and equipment',
        'Growth opportunities'
      ],
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  // Filter jobs based on search
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Animated Blob Decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 border-b border-gray-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <Badge variant="premium" className="mb-6 shadow-lg hover:shadow-xl transition-shadow">
              <Briefcase className="h-4 w-4 mr-2" />
              Join Our Team
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Build Your{" "}
              <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                Career
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join Nexverce and help us shape the future of digital commerce
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/50 hover:scale-105 group flex flex-col h-full"
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${job.gradient}`}></div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="premium" className="shadow-md">
                      {job.department}
                    </Badge>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>

                  <CardTitle className="text-2xl font-bold group-hover:bg-gradient-to-r group-hover:from-[#667eea] group-hover:to-[#764ba2] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {job.title}
                  </CardTitle>

                  <CardDescription className="mt-2 line-clamp-2">
                    {job.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 mt-auto">
                  <Link to={`/career/${job.slug || job.id}`} className="w-full">
                    <Button
                      variant="premium"
                      size="lg"
                      className="w-full shadow-lg hover:shadow-xl transition-all group"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No Jobs Found */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No positions found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}

          {/* Why Join Us Section */}
          <Card className="shadow-2xl bg-gradient-to-br from-purple-50 via-white to-blue-50 border-2 border-primary/20 mb-16">
            <CardHeader className="text-center">
              <Badge variant="premium" className="mb-4 shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Why Nexverce
              </Badge>
              <CardTitle className="text-3xl md:text-4xl">
                Why Work{" "}
                <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                  With Us
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Innovation First',
                    description: 'Work on cutting-edge projects with the latest technologies',
                    icon: '🚀'
                  },
                  {
                    title: 'Growth Opportunities',
                    description: 'Continuous learning and career advancement opportunities',
                    icon: '📈'
                  },
                  {
                    title: 'Work-Life Balance',
                    description: 'Flexible hours and remote work options',
                    icon: '⚖️'
                  }
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all border-2 border-primary/10 hover:border-primary/30"
                  >
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="shadow-2xl border-2 border-primary/20">
            <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-3xl">
                Don't See Your{" "}
                <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                  Dream Role?
                </span>
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                We're always looking for talented individuals. Send us your resume!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-8 pb-8">
              <a href="mailto:contact@nexverce.com">
                <Button variant="premium" size="lg" className="shadow-lg hover:shadow-xl transition-all">
                  <Send className="mr-2 h-5 w-5" />
                  Email Your Resume
                </Button>
              </a>
              <p className="text-gray-600 mt-4">
                Send your application to:{" "}
                <a
                  href="mailto:contact@nexverce.com"
                  className="text-primary font-semibold hover:underline"
                >
                  contact@nexverce.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
