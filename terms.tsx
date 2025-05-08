import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the ONPOINT Crypto Analyzer service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
            
            <h2>2. Description of Services</h2>
            <p>
              ONPOINT Crypto Analyzer provides cryptocurrency portfolio analysis and recommendations. Our service includes reviewing your cryptocurrency holdings and providing suggestions based on your investment goals, risk tolerance, and market conditions.
            </p>
            
            <h2>3. Payment and Fees</h2>
            <p>
              Our service requires payment of 10 USDT via TRC20 network. All payments are non-refundable once the analysis has been delivered. If we are unable to deliver the analysis within the stated timeframe, you may request a refund.
            </p>
            
            <h2>4. User Responsibilities</h2>
            <p>
              You are responsible for providing accurate information about your cryptocurrency holdings. We do not verify the ownership of the assets you claim to hold. Our analysis is based solely on the information you provide.
            </p>
            
            <h2>5. Disclaimer</h2>
            <p>
              Our analysis and recommendations are for informational purposes only and do not constitute financial advice. Cryptocurrency investments are subject to high market risk. ONPOINT Crypto Analyzer is not a financial advisor, and our analyses should not be considered financial advice. Always do your own research before investing.
            </p>
            
            <h2>6. Limitation of Liability</h2>
            <p>
              ONPOINT Crypto Analyzer shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from your use of our service or any investments made based on our recommendations.
            </p>
            
            <h2>7. Intellectual Property</h2>
            <p>
              All content, including but not limited to analyses, reports, graphics, logos, and methodologies used in our service, is the property of ONPOINT Crypto Analyzer and is protected by intellectual property laws.
            </p>
            
            <h2>8. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes via email or by posting a notice on our website.
            </p>
            
            <h2>9. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which ONPOINT Crypto Analyzer operates, without regard to its conflict of law provisions.
            </p>
            
            <h2>10. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at support@onpointcrypto.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
