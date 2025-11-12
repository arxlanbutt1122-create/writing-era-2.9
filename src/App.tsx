import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import ExitIntentPopup from "./components/ExitIntentPopup";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import Index from "./pages/Index";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import BlogsManager from "./pages/admin/BlogsManager";
import ArticlesManager from "./pages/admin/ArticlesManager";
import BiographyManager from "./pages/admin/BiographyManager";
import StorytellingManager from "./pages/admin/StorytellingManager";
import NovelsManager from "./pages/admin/NovelsManager";
import MediaLibrary from "./pages/admin/MediaLibrary";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Tools from "./pages/Tools";
import FileCompressor from "./pages/tools/FileCompressor";
import ReferenceFormatter from "./pages/tools/ReferenceFormatter";
import SurveyBuilder from "./pages/tools/SurveyBuilder";
import CGPACalculator from "./pages/tools/CGPACalculator";
import TextSummarizer from "./pages/tools/TextSummarizer";
import PromptGenerator from "./pages/tools/PromptGenerator";
import MathGame from "./pages/tools/MathGame";
import PDFEditor from "./pages/tools/PDFEditor";
import SmartCalculator from "./pages/tools/SmartCalculator";
import CPPReference from "./pages/tools/CPPReference";
import CitationGenerator from "./pages/tools/CitationGenerator";
import ResumeBuilder from "./pages/tools/ResumeBuilder";
import Translator from "./pages/tools/Translator";
import WordFormatter from "./pages/tools/WordFormatter";
import WordCounter from "./pages/tools/WordCounter";
import CPPCompiler from "./pages/tools/CPPCompiler";
import SmartReferenceFormatter from "./pages/tools/SmartReferenceFormatter";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Order from "./pages/Order";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Biographies from "./pages/Biographies";
import BiographyDetail from "./pages/BiographyDetail";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import Novels from "./pages/Novels";
import NovelDetail from "./pages/NovelDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CurrencyProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <ScrollToTop />
          <ScrollToTopButton />
          <ExitIntentPopup />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/biographies" element={<Biographies />} />
          <Route path="/biographies/:id" element={<BiographyDetail />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:slug" element={<StoryDetail />} />
          <Route path="/novels" element={<Novels />} />
          <Route path="/novels/:slug" element={<NovelDetail />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/file-compressor" element={<FileCompressor />} />
          <Route path="/tools/reference-formatter" element={<ReferenceFormatter />} />
          <Route path="/tools/survey-builder" element={<SurveyBuilder />} />
          <Route path="/tools/cgpa-calculator" element={<CGPACalculator />} />
          <Route path="/tools/text-summarizer" element={<TextSummarizer />} />
          <Route path="/tools/prompt-generator" element={<PromptGenerator />} />
          <Route path="/tools/math-game" element={<MathGame />} />
          <Route path="/tools/pdf-editor" element={<PDFEditor />} />
          <Route path="/tools/smart-calculator" element={<SmartCalculator />} />
          <Route path="/tools/cpp-reference" element={<CPPReference />} />
          <Route path="/tools/citation-generator" element={<CitationGenerator />} />
          <Route path="/tools/resume-builder" element={<ResumeBuilder />} />
          <Route path="/tools/translator" element={<Translator />} />
          <Route path="/tools/word-formatter" element={<WordFormatter />} />
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/cpp-compiler" element={<CPPCompiler />} />
          <Route path="/tools/smart-reference-formatter" element={<SmartReferenceFormatter />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/:serviceId" element={<Order />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blogs" element={<BlogsManager />} />
            <Route path="articles" element={<ArticlesManager />} />
            <Route path="biography" element={<BiographyManager />} />
            <Route path="storytelling" element={<StorytellingManager />} />
            <Route path="novels" element={<NovelsManager />} />
            <Route path="media" element={<MediaLibrary />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppFloatingButton />
      </BrowserRouter>
        </AdminAuthProvider>
      </CurrencyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
