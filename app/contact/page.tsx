import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary-light">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary-blue-light text-primary-blue hover:bg-primary-blue-light">
            Let's Connect
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Ready to <span className="text-primary-blue">Connect</span>?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Whether you're a founder looking to scale, an investor seeking
            opportunities, or an enabler wanting to expand your reach, we're
            here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-primary-blue-light">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">
                    Get in Touch
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Tell us about yourself and how we can help accelerate your
                    growth.
                  </p>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Let's Start a Conversation
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We're passionate about helping startups, investors, and
                  enablers succeed in the Indian ecosystem. Reach out to us and
                  let's discuss how we can accelerate your growth together.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="w-12 h-12 bg-primary-blue-light rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Email Us
                      </h3>
                      <p className="text-muted-foreground">
                        connect@marketingtusk.com
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="w-12 h-12 bg-primary-blue-light rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Call Us</h3>
                      <p className="text-muted-foreground">+91 70111 70693</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="w-12 h-12 bg-primary-blue-light rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Location
                      </h3>
                      <p className="text-muted-foreground">Bangalore, India</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="w-12 h-12 bg-primary-blue-light rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Response Time
                      </h3>
                      <p className="text-muted-foreground">Within 24 hours</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
