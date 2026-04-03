import { LucideIcon } from "lucide-react";
import { 
  FileText, BookOpen, GraduationCap, FileCheck, BookMarked, 
  ClipboardList, FileEdit, NotebookPen, FlaskConical, ScrollText,
  Briefcase, TrendingUp, FileSpreadsheet, Building, DollarSign,
  Newspaper, BarChart3, Lightbulb, PenTool, Feather, BookHeart,
  Wand2, Globe, Megaphone, Mail, Share2, Target, ShoppingCart,
  Code, Wrench, FileCode, Settings, FolderOpen, CheckCircle,
  Pencil, Search, Users, Award, Linkedin, Languages, Mic, FileUser
} from "lucide-react";

// Import all service images
import essayWritingImg from "@/assets/services/essay-writing.jpg";
import researchPaperImg from "@/assets/services/research-paper.jpg";
import thesisWritingImg from "@/assets/services/thesis-writing.jpg";
import dissertationWritingImg from "@/assets/services/dissertation-writing.jpg";
import courseworkHelpImg from "@/assets/services/coursework-help.jpg";
import assignmentWritingImg from "@/assets/services/assignment-writing.jpg";
import caseStudyImg from "@/assets/services/case-study.jpg";
import termPaperImg from "@/assets/services/term-paper.jpg";
import annotatedBibliographyImg from "@/assets/services/annotated-bibliography.jpg";
import literatureReviewImg from "@/assets/services/literature-review.jpg";
import labReportImg from "@/assets/services/lab-report.jpg";
import reflectiveJournalImg from "@/assets/services/reflective-journal.jpg";
import criticalThinkingImg from "@/assets/services/critical-thinking.jpg";
import businessPlanImg from "@/assets/services/business-plan.jpg";
import marketingStrategyImg from "@/assets/services/marketing-strategy.jpg";
import financialReportImg from "@/assets/services/financial-report.jpg";
import grantProposalImg from "@/assets/services/grant-proposal.jpg";
import whitePaperImg from "@/assets/services/white-paper.jpg";
import technicalReportImg from "@/assets/services/technical-report.jpg";
import projectProposalImg from "@/assets/services/project-proposal.jpg";
import resumeCvImg from "@/assets/services/resume-cv.jpg";
import coverLetterImg from "@/assets/services/cover-letter.jpg";
import linkedinProfileImg from "@/assets/services/linkedin-profile.jpg";
import powerpointImg from "@/assets/services/powerpoint.jpg";
import websiteContentImg from "@/assets/services/website-content.jpg";
import blogWritingImg from "@/assets/services/blog-writing.jpg";
import seoContentImg from "@/assets/services/seo-content.jpg";
import productDescriptionImg from "@/assets/services/product-description.jpg";
import emailMarketingImg from "@/assets/services/email-marketing.jpg";
import socialMediaImg from "@/assets/services/social-media.jpg";
import pressReleaseImg from "@/assets/services/press-release.jpg";
import copywritingImg from "@/assets/services/copywriting.jpg";
import ghostwritingImg from "@/assets/services/ghostwriting.jpg";
import bookEditingImg from "@/assets/services/book-editing.jpg";
import proofreadingImg from "@/assets/services/proofreading.jpg";
import translationImg from "@/assets/services/translation.jpg";
import admissionEssayImg from "@/assets/services/admission-essay.jpg";
import scholarshipEssayImg from "@/assets/services/scholarship-essay.jpg";
import personalStatementImg from "@/assets/services/personal-statement.jpg";
import statementOfPurposeImg from "@/assets/services/statement-of-purpose.jpg";
import motivationalLetterImg from "@/assets/services/motivational-letter.jpg";
import recommendationLetterImg from "@/assets/services/recommendation-letter.jpg";
import researchMethodologyImg from "@/assets/services/research-methodology.jpg";
import dataAnalysisImg from "@/assets/services/data-analysis.jpg";
import codingAssignmentImg from "@/assets/services/coding-assignment.jpg";
import onlineExamImg from "@/assets/services/online-exam.jpg";
import discussionPostImg from "@/assets/services/discussion-post.jpg";
import speechWritingImg from "@/assets/services/speech-writing.jpg";
import questionnaireImg from "@/assets/services/questionnaire.jpg";
import capstoneProjectImg from "@/assets/services/capstone-project.jpg";
// New unique images
import examNotesImg from "@/assets/services/exam-notes.jpg";
import shortStoriesImg from "@/assets/services/short-stories.jpg";
import poetryImg from "@/assets/services/poetry.jpg";
import novelImg from "@/assets/services/novel.jpg";
import childrenBookImg from "@/assets/services/children-book.jpg";
import articleWritingImg from "@/assets/services/article-writing.jpg";
import newsletterImg from "@/assets/services/newsletter.jpg";
import emailCampaignImg from "@/assets/services/email-campaign.jpg";
import landingPageImg from "@/assets/services/landing-page.jpg";
import adCopywritingImg from "@/assets/services/ad-copywriting.jpg";
import socialStrategyImg from "@/assets/services/social-strategy.jpg";
import techDocumentationImg from "@/assets/services/tech-documentation.jpg";
import sopImg from "@/assets/services/sop.jpg";
import processDocsImg from "@/assets/services/process-docs.jpg";
import manuscriptImg from "@/assets/services/manuscript.jpg";
import academicEditImg from "@/assets/services/academic-edit.jpg";
import annualReportImg from "@/assets/services/annual-report.jpg";
import marketResearchImg from "@/assets/services/market-research.jpg";
import comparativeEssayImg from "@/assets/services/comparative-essay.jpg";

export interface Service {
  id: string;
  title: string;
  description: string; // Short description for cards
  metaDescription: string; // SEO meta description
  explainedDescription?: string; // Full detailed description (200-300 words)
  price: string;
  priceRange: string;
  icon: LucideIcon;
  image?: string; // Service image
  category: string;
  variations?: string[];
  attributes?: string[];
  seoTags?: string[]; // SEO keywords
  uses?: string[]; // Perfect for / Use cases
  benefits?: string[]; // Why choose this service
  pricing?: {
    basePkr: number; // Base price in PKR for conversion
    pkr?: string; // Display string for PKR (optional)
    usd?: string; // Display string for USD (optional)
    notes?: string;
  };
}

export const services: Service[] = [
  // Academic Writing Services (15)
  {
    id: "essay-writing",
    title: "Essay Writing Service",
    description: "A+ quality, plagiarism-free essays written by expert writers for all academic levels.",
    metaDescription: "Get essay writing service support for argumentative, reflective, compare and contrast, and admission essays with clear structure, original writing, and timely delivery.",
    seoTags: ["essay writing service", "essay help", "custom essay writing", "academic essay writing", "college essay help"],
    price: "$15",
    priceRange: "$15-30/page",
    icon: FileText,
    image: essayWritingImg,
    category: "Academic Writing",
    variations: ["High School Essay", "Undergraduate Essay", "Master's Level Essay", "Admission Essay", "Scholarship Essay"],
    attributes: ["Plagiarism-Free", "Well-Structured", "Properly Cited", "Proofread"],
    pricing: {
      basePkr: 4200, // $15 * 280
    },
  },
  {
    id: "research-paper",
    title: "Research Paper Writing",
    description: "In-depth research papers with literature review, methodology, and comprehensive analysis.",
    metaDescription: "Get research paper writing help for topic selection, literature review, methodology, analysis, and academic formatting with original, source-based support.",
    seoTags: ["research paper writing", "research paper help", "custom research paper", "research writing service", "academic research help"],
    price: "$20",
    priceRange: "$20-40/page",
    icon: BookOpen,
    image: researchPaperImg,
    category: "Academic Writing",
    variations: ["Short Research Paper (5-7 pages)", "Standard Research Paper (10-15 pages)", "Extensive Research Project (20+ pages)"],
    attributes: ["Original Research", "Data Analysis", "Peer-Reviewed Sources", "Full Citations"],
    pricing: {
      basePkr: 5600, // $20 * 280
    },
  },
  {
    id: "thesis-writing",
    title: "Thesis Writing",
    description: "Expert thesis support for Masters and PhD with chapter-by-chapter assistance.",
    metaDescription: "Get thesis writing service support for proposals, chapters, literature reviews, methodology, editing, and revision guidance for postgraduate research.",
    seoTags: ["thesis writing service", "thesis help", "masters thesis help", "thesis proposal help", "thesis writer"],
    price: "$150",
    priceRange: "$150-500/chapter",
    icon: GraduationCap,
    image: thesisWritingImg,
    category: "Academic Writing",
    variations: ["Thesis Proposal", "Full Thesis Writing", "Individual Chapter Writing"],
    attributes: ["Scholarly Tone", "Gap Identification", "Robust Methodology", "Statistical Analysis"],
    pricing: {
      basePkr: 42000, // $150 * 280
    },
  },
  {
    id: "dissertation-writing",
    title: "Dissertation Writing",
    description: "Doctoral dissertation help from seasoned academics for every chapter.",
    metaDescription: "Get dissertation writing service support for proposals, literature reviews, methodology, analysis, discussion, editing, and chapter-by-chapter guidance.",
    seoTags: ["dissertation writing service", "dissertation help", "doctoral dissertation help", "dissertation writer", "dissertation proposal help"],
    price: "$200",
    priceRange: "$200-1000/chapter",
    icon: Award,
    image: dissertationWritingImg,
    category: "Academic Writing",
    variations: ["Dissertation Editing", "Dissertation Proposal", "Complete Dissertation Writing"],
    attributes: ["Original Contribution", "Extensive Bibliography", "Complex Data Analysis", "Publication-Ready"],
  },
  {
    id: "case-study",
    title: "Case Study Analysis",
    description: "In-depth analysis of business, medical, or legal cases with evidence-based solutions.",
    metaDescription: "Acing case studies made easy. Our writers analyze business, medical, or legal cases and provide well-reasoned solutions and reports.",
    price: "$25",
    priceRange: "$25-50/page",
    icon: FileCheck,
    image: caseStudyImg,
    category: "Academic Writing",
    variations: ["Business Case Study", "Medical Case Study", "Legal Case Study", "Situation Analysis"],
    attributes: ["SWOT/PESTLE Analysis", "Problem-Solution Format", "Recommendation Focused"],
  },
  {
    id: "literature-review",
    title: "Literature Review",
    description: "Comprehensive synthesis of existing research with critical evaluation and gap identification.",
    metaDescription: "Don't get lost in the sources. We synthesize existing research into a coherent, critical literature review for your thesis or paper.",
    price: "$25",
    priceRange: "$25-60/page",
    icon: BookMarked,
    image: literatureReviewImg,
    category: "Academic Writing",
    variations: ["Narrative Literature Review", "Systematic Literature Review", "Scoping Review"],
    attributes: ["Thematic Organization", "Critical Evaluation", "Gap Identification", "Synthesis of Sources"],
  },
  {
    id: "assignment-writing",
    title: "Assignment Writing Service",
    description: "Structured, research-based assignment writing help for university, college, and coursework tasks.",
    metaDescription: "Get assignment writing service support for university assignments, coursework, reports, and deadline-based tasks with clear structure, research support, and revision help.",
    seoTags: ["assignment writing service", "assignment help", "online assignment help", "coursework help", "college assignment help", "university assignment help"],
    price: "$10",
    priceRange: "$10-40/assignment",
    icon: ClipboardList,
    image: courseworkHelpImg,
    category: "Academic Writing",
    variations: ["Math Problems", "Programming Assignments", "Short Answer Questions", "Lab Reports"],
    attributes: ["Step-by-Step Solutions", "Adherence to Guidelines", "Various Formats"],
  },
  {
    id: "report-writing",
    title: "Academic Report Writing",
    description: "Professionally written business, technical, or academic reports with clear structure.",
    metaDescription: "Get academic report writing support for business reports, technical reports, and university submissions with clear structure, analysis, and recommendations.",
    seoTags: ["report writing service", "academic report writing", "report writing help", "business report writing", "university report help"],
    price: "$20",
    priceRange: "$20-50/page",
    icon: FileEdit,
    image: assignmentWritingImg,
    category: "Academic Writing",
    variations: ["Business Report", "Technical Report", "Book Report", "Internship Report", "Project Report"],
    attributes: ["Executive Summary", "Data Visualization", "Structured Format", "Objective Tone"],
  },
  {
    id: "exam-notes",
    title: "Exam Notes & Study Guides",
    description: "Customized, easy-to-revise notes condensed from your syllabus and materials.",
    metaDescription: "Ace your exams with customized, easy-to-revise notes. We condense your syllabus into key points, summaries, and flashcards.",
    price: "$20",
    priceRange: "$20-60/subject",
    icon: NotebookPen,
    image: examNotesImg,
    category: "Academic Writing",
    variations: ["Subject Summaries", "Mind Maps", "Flashcard Decks", "Formula Sheets"],
    attributes: ["Condensed Information", "Visual Aids", "Easy to Revise", "Syllabus-Specific"],
  },
  {
    id: "lab-report",
    title: "Lab Report Writing",
    description: "Scientific lab reports with proper methodology, data analysis, and conclusions.",
    metaDescription: "Professional lab report writing for science students. Proper format, analysis, and conclusions.",
    price: "$25",
    priceRange: "$25-45/report",
    icon: FlaskConical,
    image: labReportImg,
    category: "Academic Writing",
    attributes: ["Scientific Format", "Data Tables", "Analysis", "Proper Citations"],
  },
  {
    id: "annotated-bibliography",
    title: "Annotated Bibliography",
    description: "Comprehensive annotated bibliographies with summaries and critical evaluations.",
    metaDescription: "Expert annotated bibliography writing with proper citations and critical analysis of sources.",
    price: "$15",
    priceRange: "$15-30/page",
    icon: ScrollText,
    image: annotatedBibliographyImg,
    category: "Academic Writing",
    attributes: ["Proper Citations", "Critical Analysis", "Summary Included"],
  },
  {
    id: "reflective-essay",
    title: "Reflective Essay",
    description: "Personal reflective essays analyzing experiences and learning outcomes.",
    metaDescription: "Thoughtful reflective essays that analyze personal experiences and demonstrate learning.",
    price: "$18",
    priceRange: "$18-35/page",
    icon: PenTool,
    image: reflectiveJournalImg,
    category: "Academic Writing",
    attributes: ["Personal Voice", "Critical Reflection", "Learning Outcomes"],
  },
  {
    id: "critical-analysis",
    title: "Critical Analysis",
    description: "In-depth critical analysis of texts, theories, or concepts with scholarly evaluation.",
    metaDescription: "Expert critical analysis essays with scholarly evaluation and well-supported arguments.",
    price: "$22",
    priceRange: "$22-40/page",
    icon: Search,
    image: criticalThinkingImg,
    category: "Academic Writing",
    attributes: ["Analytical Approach", "Evidence-Based", "Scholarly Tone"],
  },
  {
    id: "comparative-essay",
    title: "Comparative Essay",
    description: "Comparative essays analyzing similarities and differences between subjects.",
    metaDescription: "Professional comparative essay writing with balanced analysis and clear comparisons.",
    price: "$20",
    priceRange: "$20-38/page",
    icon: FileText,
    image: comparativeEssayImg,
    category: "Academic Writing",
    attributes: ["Balanced Comparison", "Clear Structure", "Evidence-Based"],
  },
  {
    id: "capstone-project",
    title: "Capstone Project",
    description: "Comprehensive capstone projects demonstrating mastery of your field.",
    metaDescription: "Expert capstone project support from proposal to final presentation.",
    price: "$200",
    priceRange: "$200-800/project",
    icon: Award,
    image: capstoneProjectImg,
    category: "Academic Writing",
    attributes: ["Comprehensive Research", "Professional Presentation", "Original Work"],
  },

  // Business Writing Services (10)
  {
    id: "business-plan",
    title: "Business Plan Writing",
    description: "Investor-ready business plans with market analysis and financial projections.",
    metaDescription: "Secure funding with a compelling business plan. We create detailed plans with market analysis, financial projections, and strategic vision for startups.",
    price: "$200",
    priceRange: "$200-800",
    icon: Briefcase,
    image: businessPlanImg,
    category: "Business Writing",
    variations: ["Startup Business Plan", "SME Business Plan", "Expansion Plan", "Investor Pitch Deck"],
    attributes: ["Market Analysis", "Financial Projections", "Executive Summary", "Growth Strategy"],
  },
  {
    id: "project-proposal",
    title: "Project Proposal Writing",
    description: "Persuasive project and grant proposals tailored to RFPs and funding requirements.",
    metaDescription: "Win more work and funding with persuasive project and grant proposals. Our writers craft compelling narratives tailored to RFPs.",
    price: "$150",
    priceRange: "$150-400",
    icon: TrendingUp,
    image: projectProposalImg,
    category: "Business Writing",
    variations: ["Business Project Proposal", "Grant Proposal", "Research Proposal", "Sponsorship Proposal"],
    attributes: ["Needs Assessment", "Goal-Oriented", "Budget Planning", "Outcome Measurement"],
  },
  {
    id: "grant-writing",
    title: "Grant Writing",
    description: "Expert grant writing for NGOs and non-profits to secure funding.",
    metaDescription: "Professional grant writing services for NGOs, non-profits, and organizations seeking funding.",
    price: "$250",
    priceRange: "$250-600",
    icon: DollarSign,
    image: grantProposalImg,
    category: "Business Writing",
    attributes: ["Needs Analysis", "Budget Justification", "Impact Measurement", "Compliance"],
  },
  {
    id: "business-report",
    title: "Business Reports",
    description: "Professional business reports for decision-making and strategic planning.",
    metaDescription: "Data-driven business reports with insights, analysis, and actionable recommendations.",
    price: "$30",
    priceRange: "$30-70/page",
    icon: BarChart3,
    image: financialReportImg,
    category: "Business Writing",
    attributes: ["Data Analysis", "Executive Summary", "Recommendations", "Professional Format"],
  },
  {
    id: "white-paper",
    title: "White Papers",
    description: "Authoritative white papers that establish thought leadership and credibility.",
    metaDescription: "Professional white papers that position your brand as an industry leader.",
    price: "$300",
    priceRange: "$300-1000",
    icon: FileSpreadsheet,
    image: whitePaperImg,
    category: "Business Writing",
    attributes: ["Research-Based", "Authoritative", "Professional Design", "Credible"],
  },
  {
    id: "press-release",
    title: "Press Releases",
    description: "News-worthy press releases for media distribution and brand announcements.",
    metaDescription: "Professionally written press releases that get media attention.",
    price: "$80",
    priceRange: "$80-200",
    icon: Newspaper,
    image: pressReleaseImg,
    category: "Business Writing",
    attributes: ["AP Style", "News Angle", "Distribution Ready", "SEO Optimized"],
  },
  {
    id: "company-profile",
    title: "Company Profiles",
    description: "Compelling company profiles that showcase your brand story and capabilities.",
    metaDescription: "Professional company profiles that attract clients and partners.",
    price: "$150",
    priceRange: "$150-400",
    icon: Building,
    image: businessPlanImg,
    category: "Business Writing",
    attributes: ["Brand Story", "Professional Tone", "Capabilities Showcase"],
  },
  {
    id: "feasibility-study",
    title: "Feasibility Studies",
    description: "Comprehensive feasibility studies analyzing project viability and risks.",
    metaDescription: "Detailed feasibility studies to assess project viability and potential.",
    price: "$300",
    priceRange: "$300-800",
    icon: BarChart3,
    image: dataAnalysisImg,
    category: "Business Writing",
    attributes: ["Market Analysis", "Risk Assessment", "Financial Viability", "Recommendations"],
  },
  {
    id: "annual-report",
    title: "Annual Reports",
    description: "Professional annual reports showcasing company performance and achievements.",
    metaDescription: "Comprehensive annual reports with financial data and performance highlights.",
    price: "$400",
    priceRange: "$400-1200",
    icon: FileSpreadsheet,
    image: annualReportImg,
    category: "Business Writing",
    attributes: ["Financial Data", "Performance Metrics", "Visual Design", "Compliance"],
  },
  {
    id: "market-research",
    title: "Market Research Reports",
    description: "In-depth market research reports with industry analysis and insights.",
    metaDescription: "Professional market research reports with data analysis and market insights.",
    price: "$250",
    priceRange: "$250-700",
    icon: TrendingUp,
    image: marketResearchImg,
    category: "Business Writing",
    attributes: ["Industry Analysis", "Competitor Research", "Market Trends", "Data-Driven"],
  },

  // Creative Writing Services (5)
  {
    id: "short-stories",
    title: "Short Story Writing",
    description: "Engaging short stories with compelling characters and captivating plots.",
    metaDescription: "Professional short story writing services for fiction authors and publishers.",
    price: "$100",
    priceRange: "$100-400",
    icon: BookHeart,
    image: shortStoriesImg,
    category: "Creative Writing",
    attributes: ["Character Development", "Plot Structure", "Engaging Narrative"],
  },
  {
    id: "script-writing",
    title: "Script Writing",
    description: "Professional scripts for film, TV, theater, and video content.",
    metaDescription: "Expert scriptwriting for film, television, theater, and video productions.",
    price: "$200",
    priceRange: "$200-800",
    icon: Feather,
    image: speechWritingImg,
    category: "Creative Writing",
    attributes: ["Dialogue", "Scene Description", "Industry Format", "Character Arc"],
  },
  {
    id: "poetry-writing",
    title: "Poetry Writing",
    description: "Beautiful poetry for personal, professional, or publication purposes.",
    metaDescription: "Custom poetry writing with emotional depth and artistic expression.",
    price: "$50",
    priceRange: "$50-200",
    icon: PenTool,
    image: poetryImg,
    category: "Creative Writing",
    attributes: ["Rhythmic Flow", "Emotional Depth", "Various Styles"],
  },
  {
    id: "novel-writing",
    title: "Novel Writing",
    description: "Full-length novel writing and ghostwriting services.",
    metaDescription: "Professional novel writing and ghostwriting for aspiring authors.",
    price: "$2000",
    priceRange: "$2000-10000",
    icon: BookOpen,
    image: novelImg,
    category: "Creative Writing",
    attributes: ["Character Development", "Plot Architecture", "World Building", "Long-form Narrative"],
  },
  {
    id: "children-books",
    title: "Children's Books",
    description: "Delightful children's stories with age-appropriate themes and language.",
    metaDescription: "Engaging children's book writing with captivating stories for young readers.",
    price: "$300",
    priceRange: "$300-1500",
    icon: Wand2,
    image: childrenBookImg,
    category: "Creative Writing",
    attributes: ["Age-Appropriate", "Educational", "Entertaining", "Visual Storytelling"],
  },

  // Content Writing Services (8)
  {
    id: "seo-blog-writing",
    title: "SEO Blog Writing",
    description: "SEO-optimized blog posts that rank on Google and drive organic traffic.",
    metaDescription: "Professional SEO blog writing services that boost your search rankings and traffic.",
    price: "$30",
    priceRange: "$30-100/post",
    icon: Globe,
    image: blogWritingImg,
    category: "Content Writing",
    attributes: ["Keyword Optimized", "Engaging", "Well-Researched", "SEO Best Practices"],
  },
  {
    id: "article-writing",
    title: "Article Writing",
    description: "Well-researched articles for magazines, websites, and publications.",
    metaDescription: "Professional article writing for online and print publications.",
    price: "$40",
    priceRange: "$40-120/article",
    icon: FileText,
    image: articleWritingImg,
    category: "Content Writing",
    attributes: ["Well-Researched", "Engaging", "Publication-Ready"],
  },
  {
    id: "website-content",
    title: "Website Content",
    description: "Compelling website copy that converts visitors into customers.",
    metaDescription: "Professional website content writing that engages visitors and drives conversions.",
    price: "$100",
    priceRange: "$100-500/page",
    icon: Globe,
    image: websiteContentImg,
    category: "Content Writing",
    attributes: ["Conversion-Focused", "Brand Voice", "SEO Optimized", "User-Friendly"],
  },
  {
    id: "seo-content",
    title: "SEO Content Writing",
    description: "Strategic SEO content that improves search rankings and organic visibility.",
    metaDescription: "Expert SEO content writing services to improve your search engine rankings.",
    price: "$50",
    priceRange: "$50-150/page",
    icon: Search,
    image: seoContentImg,
    category: "Content Writing",
    attributes: ["Keyword Research", "On-Page SEO", "Natural Flow", "Rank-Worthy"],
  },
  {
    id: "sales-copywriting",
    title: "Sales Copywriting",
    description: "Persuasive sales copy that drives conversions and revenue.",
    metaDescription: "High-converting sales copy that turns prospects into customers.",
    price: "$150",
    priceRange: "$150-500",
    icon: ShoppingCart,
    image: copywritingImg,
    category: "Content Writing",
    attributes: ["Persuasive", "Conversion-Focused", "Benefit-Driven", "Call-to-Action"],
  },
  {
    id: "email-copywriting",
    title: "Email Copywriting",
    description: "Engaging email copy for newsletters, campaigns, and automation.",
    metaDescription: "Professional email copywriting that increases opens, clicks, and conversions.",
    price: "$75",
    priceRange: "$75-250/email",
    icon: Mail,
    image: emailMarketingImg,
    category: "Content Writing",
    attributes: ["Subject Lines", "Personalization", "Call-to-Action", "Mobile-Friendly"],
  },
  {
    id: "social-media-content",
    title: "Social Media Content",
    description: "Engaging social media posts and captions for all platforms.",
    metaDescription: "Creative social media content that increases engagement and followers.",
    price: "$50",
    priceRange: "$50-200/package",
    icon: Share2,
    image: socialMediaImg,
    category: "Content Writing",
    attributes: ["Platform-Specific", "Engaging", "Hashtag Strategy", "Visual-Friendly"],
  },
  {
    id: "newsletter-writing",
    title: "Newsletter Writing",
    description: "Compelling newsletters that keep your audience informed and engaged.",
    metaDescription: "Professional newsletter writing services for email marketing success.",
    price: "$100",
    priceRange: "$100-300/issue",
    icon: Mail,
    image: newsletterImg,
    category: "Content Writing",
    attributes: ["Engaging Format", "Value-Driven", "Consistent Voice", "Click-Worthy"],
  },

  // Technical Writing Services (5)
  {
    id: "user-manuals",
    title: "User Manuals",
    description: "Clear, comprehensive user manuals and instruction guides.",
    metaDescription: "Professional user manual writing for products and software.",
    price: "$200",
    priceRange: "$200-800",
    icon: BookOpen,
    image: technicalReportImg,
    category: "Technical Writing",
    attributes: ["Step-by-Step", "Visual Aids", "User-Friendly", "Accurate"],
  },
  {
    id: "technical-documentation",
    title: "Technical Documentation",
    description: "Detailed technical documentation for software, products, and processes.",
    metaDescription: "Expert technical documentation services for complex systems and products.",
    price: "$300",
    priceRange: "$300-1000",
    icon: FileCode,
    image: techDocumentationImg,
    category: "Technical Writing",
    attributes: ["Detailed", "Accurate", "Well-Organized", "Technical Accuracy"],
  },
  {
    id: "api-documentation",
    title: "API Documentation",
    description: "Developer-friendly API documentation with examples and use cases.",
    metaDescription: "Professional API documentation for software developers and teams.",
    price: "$250",
    priceRange: "$250-800",
    icon: Code,
    image: codingAssignmentImg,
    category: "Technical Writing",
    attributes: ["Code Examples", "Clear Endpoints", "Authentication", "Use Cases"],
  },
  {
    id: "sop-writing",
    title: "SOP Writing",
    description: "Standard Operating Procedures for business processes and compliance.",
    metaDescription: "Professional SOP writing for business processes and quality standards.",
    price: "$150",
    priceRange: "$150-500",
    icon: Settings,
    image: sopImg,
    category: "Technical Writing",
    attributes: ["Step-by-Step", "Compliance-Ready", "Clear Process", "Quality Standards"],
  },
  {
    id: "process-documentation",
    title: "Process Documentation",
    description: "Comprehensive process documentation for workflows and operations.",
    metaDescription: "Expert process documentation for operational efficiency and training.",
    price: "$200",
    priceRange: "$200-600",
    icon: FolderOpen,
    image: processDocsImg,
    category: "Technical Writing",
    attributes: ["Workflow Diagrams", "Clear Steps", "Training-Ready", "Standardized"],
  },

  // Editing & Proofreading Services (4)
  {
    id: "academic-editing",
    title: "Academic Editing",
    description: "Professional editing for academic papers, theses, and dissertations.",
    metaDescription: "Expert academic editing services to polish your research work.",
    price: "$15",
    priceRange: "$15-30/page",
    icon: CheckCircle,
    image: academicEditImg,
    category: "Editing & Proofreading",
    attributes: ["Grammar Check", "Structure Improvement", "Citation Review", "Clarity"],
  },
  {
    id: "business-editing",
    title: "Business Document Editing",
    description: "Professional editing for business documents, reports, and proposals.",
    metaDescription: "Professional business document editing for clarity and impact.",
    price: "$20",
    priceRange: "$20-40/page",
    icon: Briefcase,
    image: bookEditingImg,
    category: "Editing & Proofreading",
    attributes: ["Professional Tone", "Clarity", "Grammar Check", "Formatting"],
  },
  {
    id: "manuscript-editing",
    title: "Manuscript Editing",
    description: "Comprehensive manuscript editing for books, novels, and publications.",
    metaDescription: "Expert manuscript editing for authors preparing for publication.",
    price: "$25",
    priceRange: "$25-50/page",
    icon: BookOpen,
    image: manuscriptImg,
    category: "Editing & Proofreading",
    attributes: ["Developmental Edit", "Line Edit", "Copy Edit", "Publication-Ready"],
  },
  {
    id: "proofreading",
    title: "Proofreading Services",
    description: "Final proofreading to catch errors before submission or publication.",
    metaDescription: "Professional proofreading services for error-free documents.",
    price: "$10",
    priceRange: "$10-20/page",
    icon: Pencil,
    image: proofreadingImg,
    category: "Editing & Proofreading",
    attributes: ["Error-Free", "Grammar", "Spelling", "Punctuation"],
  },

  // Marketing Writing Services (5)
  {
    id: "ad-copy",
    title: "Ad Copywriting",
    description: "Compelling ad copy for Google Ads, Facebook, and other platforms.",
    metaDescription: "High-converting ad copy that maximizes your advertising ROI.",
    price: "$100",
    priceRange: "$100-300/campaign",
    icon: Megaphone,
    image: adCopywritingImg,
    category: "Marketing Writing",
    attributes: ["Attention-Grabbing", "Conversion-Focused", "Platform-Specific", "A/B Tested"],
  },
  {
    id: "landing-pages",
    title: "Landing Page Copy",
    description: "High-converting landing page copy that drives leads and sales.",
    metaDescription: "Professional landing page copywriting that converts visitors into customers.",
    price: "$200",
    priceRange: "$200-600/page",
    icon: Target,
    image: landingPageImg,
    category: "Marketing Writing",
    attributes: ["Conversion-Optimized", "Clear CTA", "Benefit-Driven", "Trust-Building"],
  },
  {
    id: "email-campaigns",
    title: "Email Campaign Writing",
    description: "Complete email marketing campaigns from strategy to execution.",
    metaDescription: "Full-service email campaign writing for marketing automation.",
    price: "$250",
    priceRange: "$250-800/campaign",
    icon: Mail,
    image: emailCampaignImg,
    category: "Marketing Writing",
    attributes: ["Campaign Strategy", "Series Writing", "Segmentation", "Performance-Driven"],
  },
  {
    id: "social-strategy",
    title: "Social Media Strategy",
    description: "Comprehensive social media content strategy and calendar.",
    metaDescription: "Professional social media strategy and content planning.",
    price: "$300",
    priceRange: "$300-1000/month",
    icon: Share2,
    image: socialStrategyImg,
    category: "Marketing Writing",
    attributes: ["Content Calendar", "Platform Strategy", "Engagement Plan", "Analytics"],
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    description: "Strategic content marketing plans to attract and convert customers.",
    metaDescription: "Comprehensive content marketing strategy and execution.",
    price: "$500",
    priceRange: "$500-2000/month",
    icon: Lightbulb,
    image: marketingStrategyImg,
    category: "Marketing Writing",
    attributes: ["Strategy", "Content Creation", "Distribution", "Performance Tracking"],
  },

  // Other Services (3)
  {
    id: "resume-cv-writing",
    title: "Resume/CV Writing",
    description: "Professional resumes and CVs that get you interviews.",
    metaDescription: "Expert resume and CV writing services that land you interviews.",
    price: "$100",
    priceRange: "$100-300",
    icon: Users,
    image: resumeCvImg,
    category: "Other Services",
    attributes: ["ATS-Optimized", "Achievement-Focused", "Industry-Specific", "Professional Format"],
  },
  {
    id: "cover-letter",
    title: "Cover Letter Writing",
    description: "Compelling cover letters that complement your resume perfectly.",
    metaDescription: "Professional cover letter writing that makes you stand out.",
    price: "$50",
    priceRange: "$50-150",
    icon: Mail,
    image: coverLetterImg,
    category: "Other Services",
    attributes: ["Personalized", "Persuasive", "Job-Specific", "Professional"],
  },
  {
    id: "linkedin-optimization",
    title: "LinkedIn Optimization",
    description: "Complete LinkedIn profile optimization to attract recruiters.",
    metaDescription: "Professional LinkedIn profile optimization for career success.",
    price: "$150",
    priceRange: "$150-400",
    icon: Linkedin,
    image: linkedinProfileImg,
    category: "Other Services",
    attributes: ["SEO-Optimized", "Professional Headline", "Keyword-Rich", "Recruiter-Friendly"],
  },
  {
    id: "translation-services",
    title: "Professional Translation Services",
    description: "Expert Urdu-English translation for academic and business documents.",
    metaDescription: "Professional Urdu to English and English to Urdu translation services for academic papers, business documents, and official records.",
    explainedDescription: "Our professional translation services bridge language barriers with precision and cultural sensitivity. We specialize in Urdu-English translation for academic research papers, thesis documents, business reports, legal documents, and official certificates. Our native translators ensure accurate terminology, maintain the original tone and context, and deliver culturally appropriate translations that resonate with your target audience. Perfect for students, businesses, and professionals needing high-quality translations.",
    price: "$20",
    priceRange: "$20-50/page",
    icon: Languages,
    image: translationImg,
    category: "Other Services",
    variations: ["Urdu to English Translation", "English to Urdu Translation", "Document Translation", "Certificate Translation", "Academic Paper Translation"],
    attributes: ["Native Translators", "Culturally Accurate", "Certified Translation", "Fast Turnaround", "Confidential"],
    seoTags: ["urdu translation", "english translation", "document translation", "academic translation", "certified translator"],
    uses: [
      "Academic research papers and thesis translation",
      "Business documents and contracts",
      "Official certificates and legal documents",
      "Website and marketing content localization",
      "Personal documents for immigration",
    ],
    benefits: [
      "Native speakers ensure linguistic accuracy",
      "Cultural context maintained throughout",
      "Certified translations accepted by universities",
      "Quick turnaround for urgent projects",
      "100% confidentiality guaranteed",
    ],
    pricing: {
      basePkr: 5600, // $20 * 280
      pkr: "PKR 5,000-12,000",
      usd: "$20-50/page",
      notes: "Pricing varies based on complexity and urgency",
    },
  },
  {
    id: "speech-writing",
    title: "Eloquent Speech Writing",
    description: "Powerful speeches for any occasion - from corporate events to personal celebrations.",
    metaDescription: "Professional speech writing services for corporate events, conferences, weddings, graduations, and special occasions. Engage your audience with eloquent speeches.",
    explainedDescription: "Make your words count with professionally crafted speeches that captivate audiences and deliver your message with impact. Our expert speech writers create compelling narratives for corporate presentations, conference keynotes, wedding toasts, graduation ceremonies, award acceptances, and political campaigns. We understand the power of rhetoric, timing, and emotional connection. Each speech is tailored to your voice, audience, and occasion, incorporating storytelling techniques, persuasive elements, and memorable phrases that resonate long after the applause fades.",
    price: "$150",
    priceRange: "$150-600",
    icon: Mic,
    image: speechWritingImg,
    category: "Creative Writing",
    variations: ["Corporate Speech", "Wedding Toast", "Keynote Address", "Graduation Speech", "Award Acceptance Speech", "Political Speech", "Motivational Speech"],
    attributes: ["Audience Analysis", "Rhetorical Devices", "Emotional Impact", "Memorable Phrases", "Delivery Notes Included"],
    seoTags: ["speech writing", "public speaking", "keynote speech", "wedding speech", "corporate presentation"],
    uses: [
      "Corporate events and conferences",
      "Wedding ceremonies and celebrations",
      "Graduation and commencement addresses",
      "Award ceremonies and recognitions",
      "Political campaigns and rallies",
      "Motivational speaking engagements",
    ],
    benefits: [
      "Professionally crafted narratives that engage",
      "Tailored to your voice and speaking style",
      "Includes delivery tips and timing notes",
      "Rhetorical techniques for maximum impact",
      "Unlimited revisions until perfect",
    ],
    pricing: {
      basePkr: 42000, // $150 * 280
      pkr: "PKR 40,000-150,000",
      usd: "$150-600",
      notes: "Pricing based on speech length and complexity",
    },
  },
  {
    id: "personal-statement",
    title: "Winning Personal Statement Writing",
    description: "Compelling personal statements that get you accepted to top universities and programs.",
    metaDescription: "Professional personal statement writing for university admissions, scholarships, and graduate programs. Stand out with a compelling narrative.",
    explainedDescription: "Your personal statement is your chance to shine beyond grades and test scores. Our expert writers craft authentic, compelling narratives that showcase your unique journey, achievements, and aspirations. We specialize in personal statements for undergraduate admissions, graduate school applications, scholarship essays, medical school, law school, MBA programs, and job applications. Each statement is carefully structured to highlight your strengths, address potential weaknesses tactfully, and demonstrate why you're the perfect fit for your chosen program. We ensure your voice remains authentic while presenting your story in the most impactful way.",
    price: "$150",
    priceRange: "$150-400",
    icon: FileUser,
    image: personalStatementImg,
    category: "Academic Writing",
    variations: ["University Admission Statement", "Graduate School Statement", "Medical School Statement", "Law School Statement", "MBA Statement", "Scholarship Essay", "UCAS Personal Statement"],
    attributes: ["Authentic Voice", "Achievement Focused", "Program-Specific", "Compelling Narrative", "Revision Included"],
    seoTags: ["personal statement", "admission essay", "university application", "SOP writing", "scholarship essay"],
    uses: [
      "Undergraduate university admissions",
      "Graduate and postgraduate programs",
      "Medical and law school applications",
      "MBA and business school programs",
      "Scholarship and fellowship applications",
      "Job applications requiring statements",
    ],
    benefits: [
      "Written by admission experts who know what works",
      "Authentic voice that represents you genuinely",
      "Tailored to specific program requirements",
      "Highlights achievements without bragging",
      "Addresses weaknesses strategically",
      "Multiple revisions until you're satisfied",
    ],
    pricing: {
      basePkr: 42000, // $150 * 280
      pkr: "PKR 40,000-100,000",
      usd: "$150-400",
      notes: "Pricing varies by program type and urgency",
    },
  },
  {
    id: "email-newsletter-series",
    title: "Email Newsletter Series Writing",
    description: "Engaging email newsletter series that build relationships and drive conversions over time.",
    metaDescription: "Professional email newsletter series writing services. Build audience engagement, nurture leads, and drive conversions with compelling email sequences.",
    explainedDescription: "Build lasting relationships with your audience through strategic email newsletter series. Our expert copywriters create engaging multi-part email sequences for welcome series, product launches, educational courses, seasonal campaigns, and customer retention. Each newsletter is crafted to deliver value, build trust, and gently guide subscribers toward your business goals. We focus on storytelling, personalization, and clear calls-to-action that respect your audience's inbox while driving measurable results. Perfect for businesses looking to nurture leads, onboard customers, or maintain consistent communication with their community.",
    price: "$300",
    priceRange: "$300-1000",
    icon: Mail,
    category: "Marketing Writing",
    variations: ["Welcome Email Series", "Product Launch Sequence", "Educational Drip Campaign", "Seasonal Newsletter Series", "Re-engagement Campaign", "Customer Onboarding Emails"],
    attributes: ["Strategic Sequencing", "Personalized Content", "A/B Testing Ready", "Mobile Optimized", "CTA Focused"],
    seoTags: ["email newsletter", "email sequence", "drip campaign", "email marketing", "newsletter series"],
    uses: [
      "Welcome new subscribers and set expectations",
      "Launch products with multi-part storytelling",
      "Educate customers through drip campaigns",
      "Re-engage inactive subscribers",
      "Onboard new customers systematically",
      "Seasonal promotions and campaigns",
    ],
    benefits: [
      "Strategic sequence planning for maximum engagement",
      "Consistent brand voice across all emails",
      "Compelling subject lines to boost open rates",
      "Clear CTAs that drive conversions",
      "Mobile-responsive formatting",
      "A/B testing recommendations included",
    ],
    pricing: {
      basePkr: 84000, // $300 * 280
      pkr: "PKR 80,000-250,000",
      usd: "$300-1000",
      notes: "Pricing based on series length and complexity",
    },
  },
];

export const categories = [
  "Academic Writing",
  "Business Writing",
  "Creative Writing",
  "Content Writing",
  "Technical Writing",
  "Editing & Proofreading",
  "Marketing Writing",
  "Other Services",
];
