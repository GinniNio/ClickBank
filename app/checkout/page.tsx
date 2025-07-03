import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Checkout - ClickBank Marketing Secrets',
  description: 'Complete your purchase and start your ClickBank success journey today.',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Purchase</h1>
          <p className="text-lg text-gray-600">You're just one step away from unlocking your ClickBank success!</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ClickBank Marketing Secrets Course</span>
                  <span className="font-semibold">$197</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Private Facebook Group Access</span>
                  <span className="text-green-600">Included</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weekly Q&A Sessions</span>
                  <span className="text-green-600">Included</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bonus Templates & Scripts</span>
                  <span className="text-green-600">Included</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>$197</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Information</h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Secure Payment:</strong> Your payment will be processed securely through our trusted payment partners.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>30-Day Money-Back Guarantee:</strong> If you're not satisfied with your results, we'll refund your investment, no questions asked.
                  </p>
                </div>
                
                <button className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition duration-200">
                  Complete Purchase - $197
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 