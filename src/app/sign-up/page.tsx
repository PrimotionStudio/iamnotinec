'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { BeatLoader } from "react-spinners";
import axios from 'axios';
import { UserRegisteration } from '@/lib/interfaces/User';
import toast, { Toaster } from 'react-hot-toast';

export default function SignUpPage() {
    const [user, setUser] = useState<UserRegisteration>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!user.firstName.trim()) newErrors.firstName = 'Firstname is required';
        if (!user.lastName.trim()) newErrors.lastName = 'Lastname is required';
        if (!user.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = 'Email is invalid';
        if (!user.phone.trim()) newErrors.phone = 'Phone is required';
        if (!user.password) newErrors.password = 'Password is required';
        else if (user.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (user.password !== user.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);
            setSubmitSuccess(true);
            // Redirect to dashboard after successful signup
            setTimeout(() => router.push('/dashboard'), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4 relative">
            <Link
                href="/"
                className="absolute top-4 left-4 flex items-center text-green-600 hover:text-green-700"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-green-800">Sign Up</CardTitle>
                    <CardDescription>
                        Create an account to start your own elections and revolutionize voting
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {submitSuccess ? (
                        <Alert className="mb-4">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                                Your account has been created. Redirecting to dashboard...
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex gap-x-2">
                                <div className="space-y-2 w-1/2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="John"
                                        value={user.firstName}
                                        onChange={handleChange}
                                        className={errors.firstName ? 'border-red-500' : ''}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                                </div>
                                <div className="space-y-2 w-1/2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Doe"
                                        value={user.lastName}
                                        onChange={handleChange}
                                        className={errors.lastName ? 'border-red-500' : ''}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                                </div>
                            </div>
                            <div className="flex gap-x-2">
                                <div className="space-y-2 w-1/2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="0801234567"
                                        value={user.phone}
                                        onChange={handleChange}
                                        className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                                </div>
                                <div className="space-y-2 w-1/2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={user.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className={errors.password ? 'border-red-500' : ''}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={user.confirmPassword}
                                    onChange={handleChange}
                                    className={errors.confirmPassword ? 'border-red-500' : ''}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing up...' : 'Sign up'}
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-gray-600">
                        Already have an account? <Link href="/sign-in" className="text-green-600 hover:underline">Sign in</Link>
                    </p>
                </CardFooter>
            </Card>
            {/* <div className="mt-8 max-w-md text-center">
                <h2 className="text-xl font-semibold text-green-800 mb-4">Why Choose Our Platform?</h2>
                <ul className="space-y-2 text-green-700">
                    <li><CheckCircle2 className="inline-block mr-2 h-5 w-5" /> Create custom election links</li>
                    <li><CheckCircle2 className="inline-block mr-2 h-5 w-5" /> Choose between anonymous or validated voting</li>
                    <li><CheckCircle2 className="inline-block mr-2 h-5 w-5" /> Verify voters for secure elections</li>
                    <li><CheckCircle2 className="inline-block mr-2 h-5 w-5" /> Real-time results and transparent process</li>
                </ul>
            </div> */}
            <Toaster />
        </div>
    );
}