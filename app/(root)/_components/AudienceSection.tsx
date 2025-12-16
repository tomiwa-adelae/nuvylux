import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconFeather, IconHeart, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export const AudienceSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container text-center">
        <h2 className="font-semibold text-2xl md:text-3xl 2xl:text-4xl text-primary text-center mb-2">
          Who We Serve
        </h2>
        <p className="text-base text-muted-foreground mb-8">
          Helping you find your path within the NUVYLUX ecosystem.
        </p>

        <div className="grid md:grid-cols-3 gap-2">
          <AudienceCard
            icon={IconUser}
            title="For Creators"
            description="Tools, visibility, education, and monetization to elevate your influence."
            ctaLabel="Join as a Creator"
            ctaHref="/join/creator"
          />
          <AudienceCard
            icon={IconFeather}
            title="For Brands"
            description="Strategy, innovation, campaigns, and high-impact partnerships."
            ctaLabel="Work with Us"
            ctaHref="/work-with-us"
          />
          <AudienceCard
            icon={IconHeart}
            title="For Consumers"
            description="Personalized beauty, fashion, and curated luxury experiences."
            ctaLabel="Explore Experiences"
            ctaHref="/experiences"
          />
        </div>
      </div>
    </section>
  );
};

interface AudienceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

const AudienceCard: React.FC<AudienceCardProps> = ({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
}) => (
  <Card>
    <CardContent>
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mb-4 transition-transform hover:scale-110">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button asChild variant={"outline"} className="w-full">
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </CardContent>
  </Card>
);
