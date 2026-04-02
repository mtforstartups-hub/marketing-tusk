import Image from "next/image";

export default function Partners() {
  const partners = [
    {
      name: "Aamukh Capital",
      logo: encodeURI("/images/partners/Portfolio Logo - Aamukh Capital.png"),
    },
    {
      name: "All Terra",
      logo: encodeURI("/images/partners/Portfolio Logo - All Terra.png"),
    },
    // {
    //   name: "AmeenJi",
    //   logo: encodeURI("/images/partners/Portfolio Logo - AmeenJi.png"),
    // },
    // {
    //   name: "Anawil",
    //   logo: encodeURI("/images/partners/Portfolio Logo - Anawil.png"),
    // },
    {
      name: "Append",
      logo: encodeURI("/images/partners/Portfolio Logo - Append.png"),
    },
    // {
    //   name: "ATM",
    //   logo: encodeURI("/images/partners/Portfolio Logo - ATM.png"),
    // },
    {
      name: "Bajaj VC",
      logo: encodeURI("/images/partners/Portfolio Logo - Bajaj VC.png"),
    },
    // {
    //   name: "ClassView",
    //   logo: encodeURI("/images/partners/Portfolio Logo - ClassView.png"),
    // },
    {
      name: "Decipher Investment",
      logo: encodeURI(
        "/images/partners/Portfolio Logo - Decipher Investment.png",
      ),
    },
    {
      name: "EagleEyeView",
      logo: encodeURI("/images/partners/Portfolio Logo - EagleEyeView.png"),
    },
    // {
    //   name: "Ecoline",
    //   logo: encodeURI("/images/partners/Portfolio Logo - Ecoline.png"),
    // },
    {
      name: "EUVA",
      logo: encodeURI("/images/partners/Portfolio Logo - EUVA.png"),
    },
    {
      name: "Evolvex",
      logo: encodeURI("/images/partners/Portfolio Logo - Evolvex.png"),
    },
    {
      name: "EweGo",
      logo: encodeURI("/images/partners/Portfolio Logo - EweGo.png"),
    },
    {
      name: "Focusline",
      logo: encodeURI("/images/partners/Portfolio Logo - Focusline.png"),
    },
    {
      name: "Foodelthy",
      logo: encodeURI("/images/partners/Portfolio Logo - Foodelthy.png"),
    },
    {
      name: "Green Guard Enviro",
      logo: encodeURI(
        "/images/partners/Portfolio Logo - Green Guard Enviro.png",
      ),
    },
    // {
    //   name: "Hem Securities",
    //   logo: encodeURI(
    //     "/images/partners/Portfolio Logo - Hem Securities.png",
    //   ),
    // },
    {
      name: "Innovartan",
      logo: encodeURI("/images/partners/Portfolio Logo - Innovartan.png"),
    },
    {
      name: "Lotus",
      logo: encodeURI("/images/partners/Portfolio Logo - Lotus.png"),
    },
    {
      name: "Project Zenith",
      logo: encodeURI("/images/partners/Portfolio Logo - Project Zenith.png"),
    },
    {
      name: "Rasta",
      logo: encodeURI("/images/partners/Portfolio Logo - Rasta.png"),
    },
    {
      name: "Rlogy",
      logo: encodeURI("/images/partners/Portfolio Logo - Rlogy.png"),
    },
    {
      name: "Statsh",
      logo: encodeURI("/images/partners/Portfolio Logo - Statsh.png"),
    },
    {
      name: "StudentTenant",
      logo: encodeURI("/images/partners/Portfolio Logo - StudentTenant.png"),
    },
    {
      name: "TPL",
      logo: encodeURI("/images/partners/Portfolio Logo - TPL.png"),
    },
    {
      name: "ugees",
      logo: encodeURI("/images/partners/Portfolio Logo - ugees.png"),
    },
    {
      name: "Venturizer",
      logo: encodeURI("/images/partners/Portfolio Logo - Venturizer.png"),
    },
    {
      name: "Yugartha",
      logo: encodeURI("/images/partners/Portfolio Logo - Yugartha.png"),
    },
    // {
    //   name: "Zelio",
    //   logo: encodeURI("/images/partners/Portfolio Logo - Zelio.png"),
    // },
  ];
  return (
    <section className="py-16 bg-background border-b overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Infinite Logo Slider */}
        <div className="relative">
          <div className="flex animate-scroll space-x-16 items-center">
            {/* First set of logos */}
            <div className="flex space-x-16 items-center min-w-max">
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="h-12 w-auto object-contain transition-all duration-300"
                    width={120}
                    height={60}
                  />
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-16 items-center min-w-max">
              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="h-12 w-auto object-contain filter brightness-0 dark:brightness-100 hover:filter-none transition-all duration-300"
                    width={120}
                    height={60}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
