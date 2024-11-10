import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, Lock, BarChart3 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const activeElections = [
  { id: 1, title: "Presidential Election 2023", voters: 5000000, endDate: "2023-12-31" },
  { id: 2, title: "Gubernatorial Election - Lagos State", voters: 1500000, endDate: "2023-11-15" },
  { id: 3, title: "Senatorial Election - FCT", voters: 500000, endDate: "2023-10-30" },
];

const features = [
  { icon: Users, title: "Inclusive Voting", description: "Open to all eligible voters" },
  { icon: Lock, title: "Secure & Transparent", description: "Blockchain-backed voting system" },
  { icon: BarChart3, title: "Real-time Results", description: "Live updates on election progress" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <header className="bg-green-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">I am not INEC</h1>
            <div className="space-x-4">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/elections" className="hover:underline">Elections</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
              <Link href="/sign-in" className="hover:underline">Sign In</Link>
              <Link href="/sign-up">
                <Button variant="outline" className="bg-white text-green-800 hover:bg-green-100">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-5xl font-bold text-green-800 mb-6">Revolutionizing Online Voting in Nigeria</h2>
          <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Experience a transparent, secure, and accessible election process. We're not INEC, we're better.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6">
              Create an Election
            </Button>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-green-800 mb-8 text-center">Active Elections</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activeElections.map((election) => (
                <Card key={election.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-700">{election.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">Voters: {election.voters.toLocaleString()}</p>
                    <p className="mb-4">Ends: {election.endDate}</p>
                    <Link href={`/election/${election.id}`}>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-green-800 mb-8 text-center">Why Choose Our Platform?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <feature.icon className="mx-auto h-12 w-12 text-green-600 mb-4" />
                    <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-green-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to Transform Nigerian Elections?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join us in creating a more transparent and efficient voting system for Nigeria.
            </p>
            <Button className="bg-white text-green-800 hover:bg-green-100 text-lg px-8 py-6">
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">About Us</h4>
              <p>We are dedicated to improving Nigeria's democratic process through innovative technology.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <p>Email: info@iamnotinec.ng</p>
              <p>Phone: +234 123 456 7890</p>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="mt-8 text-center">
            <p>&copy; 2023 I am not INEC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}