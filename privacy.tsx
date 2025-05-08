import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, including:
            </p>
            <ul>
              <li>Name (optional)</li>
              <li>Email address</li>
              <li>Investment goals and preferences</li>
              <li>Information about your cryptocurrency holdings</li>
              <li>Transaction hash for payment verification</li>
            </ul>
            
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Analyze your cryptocurrency portfolio</li>
              <li>Generate personalized recommendations</li>
              <li>Communicate with you about our services</li>
              <li>Verify payment for our services</li>
            </ul>
            
            <h2>3. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. We use industry-standard encryption to protect sensitive data transmission. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2>4. Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. We delete all sensitive portfolio data after delivering your analysis report.
            </p>
            
            <h2>5. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our service, so long as those parties agree to keep this information confidential.
            </p>
            
            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to object to processing of your information</li>
            </ul>
            
            <h2>7. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@onpointcrypto.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
