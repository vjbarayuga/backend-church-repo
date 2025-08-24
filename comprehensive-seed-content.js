// comprehensive-seed-content.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Admin from "./models/Admin.js";
import PageContent from "./models/PageContent.js";
import Service from "./models/Service.js";
import Sacrament from "./models/Sacrament.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/church_db";

const seedContentData = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("🔄 Starting comprehensive content seeding...");

    // Clear existing data
    await PageContent.deleteMany({});
    await Service.deleteMany({});
    await Sacrament.deleteMany({});

    // Seed Page Content
    const pageContents = [
      {
        pageName: "about",
        heroImage: "/images/about-hero.jpg",
        heroTitle: "About Our Parish",
        heroSubtitle:
          "Learn about our faith community, our mission, and our commitment to serving God and our neighbors.",
        content: `Welcome to Minor Basilica and Archdiocesan Shrine of Our Lady of the Assumption. Our parish has been a beacon of faith in our community for decades, bringing together people from all walks of life in worship, fellowship, and service.

Our mission is to proclaim the Gospel of Jesus Christ, celebrate the sacraments, and build a community of faith that serves as a light to the world. We are committed to fostering spiritual growth, supporting our members in their faith journey, and reaching out to those in need.

Our parish family is diverse and welcoming, united in our love for God and our commitment to following Christ's teachings. Whether you are a lifelong Catholic or someone exploring the faith, we invite you to join us in worship and community.`,
        isActive: true,
      },
      {
        pageName: "priest",
        heroImage: "/images/priest-hero.jpg",
        heroTitle: "Our Spiritual Leader",
        heroSubtitle:
          "Meet our dedicated pastor who guides our parish community with wisdom, compassion, and unwavering faith.",
        content: `Our parish priest serves as our spiritual shepherd, leading us in worship, providing pastoral care, and guiding our community in faith formation. With years of dedicated service to the Church, our pastor brings deep theological knowledge and pastoral experience to our parish family.

Through homilies, pastoral counseling, and community leadership, our priest helps parishioners grow in their relationship with God and live out their Catholic faith in daily life. The pastoral ministry extends beyond Sunday Mass to include visiting the sick, counseling families, and providing spiritual direction to those seeking to deepen their faith.

We are blessed to have such dedicated spiritual leadership in our parish community.`,
        isActive: true,
      },
      {
        pageName: "mass-times",
        heroImage: "/images/mass-hero.jpg",
        heroTitle: "Mass Schedule",
        heroSubtitle:
          "Join us for the celebration of the Eucharist and experience the grace of God in our liturgical worship.",
        content: `The Holy Mass is the center of our Catholic faith and the source of our spiritual strength. We invite you to join us for the celebration of the Eucharist throughout the week.

Our Mass schedule accommodates various needs of our parish community, from early morning weekday Masses for those starting their day with prayer, to weekend celebrations that bring our entire parish family together.

All are welcome to participate in our liturgical celebrations. Whether you are a regular parishioner or visiting for the first time, we encourage you to experience the beauty and grace of the Catholic Mass with us.

Please check our current schedule below and plan to join us for worship. Special liturgical celebrations and holiday schedules will be announced in advance through our parish bulletin and website.`,
        isActive: true,
      },
      {
        pageName: "services",
        heroImage: "/images/services-hero.jpg",
        heroTitle: "Parish Services",
        heroSubtitle:
          "Discover the various ministries and services our parish offers to support your spiritual journey and community involvement.",
        content: `Our parish offers a wide range of services and ministries designed to support the spiritual, educational, and social needs of our community. From faith formation programs to community outreach initiatives, we strive to serve God by serving others.

Our services include educational programs for all ages, from children's religious education to adult faith formation classes. We also offer various spiritual development opportunities such as retreats, prayer groups, and devotional services.

Community service is an integral part of our parish mission. We organize various outreach programs to help those in need, both within our parish and in the broader community. Through these services, we put our faith into action and live out the Gospel message of love and service.

We invite you to explore our various ministries and find ways to get involved in the life of our parish community.`,
        isActive: true,
      },
      // ADDED our-history entry
      {
        pageName: "our-history",
        heroImage: "/images/church-history.jpg",
        heroTitle: "Our History",
        heroSubtitle: "A Legacy of Faith Since 1950",
        content: `Our parish has a rich history of faith, service, and community since 1950. Generations have come together to worship, celebrate, and support one another in Christ.`,
        isActive: true,
      },
    ];

    await PageContent.insertMany(pageContents);
    console.log("✅ Page content seeded successfully");

    // Seed Services
    const services = [
      {
        name: "Holy Baptism",
        description: "The sacrament of initiation into the Catholic Church, cleansing from original sin and welcoming the individual into the community of faith.",
        image: "/images/baptism.jpg",
        requirements: [
          "Birth certificate of the child (original or certified copy)",
          "Parents' marriage certificate (if married in the Catholic Church)",
          "Godparents' certificates of confirmation (must be practicing Catholics)",
          "Pre-baptismal seminar attendance (for first-time parents)"
        ],
        processSteps: [
          { step: "Initial Meeting", description: "Meet with parish priest or deacon to discuss baptism" },
          { step: "Document Submission", description: "Submit all required documents to parish office" },
          { step: "Attend Seminar", description: "Parents and godparents attend pre-baptismal seminar" },
          { step: "Final Preparation", description: "Review ceremony details and finalize arrangements" },
          { step: "Baptism Ceremony", description: "Celebration of the sacrament" }
        ],
        fees: "₱1,000 (includes certificate and candle); additional donations optional",
        contactInfo: "Parish Secretary: (02) 123-4567 | baptism@church.org",
        order: 1,
        isActive: true
      },
      {
        name: "Christian Burial",
        description: "The Church's final farewell to the faithful departed, commending their soul to God's mercy and celebrating the hope of resurrection.",
        image: "/images/burial.jpg",
        requirements: [
          "Death certificate (official)",
          "Baptismal certificate of deceased (if available)",
          "Funeral home coordination (church must coordinate with funeral director)"
        ],
        processSteps: [
          { step: "Contact Parish", description: "Family contacts parish office to arrange funeral" },
          { step: "Documentation", description: "Submit required documents and arrange details" },
          { step: "Wake Service", description: "Prayer service at funeral home or church" },
          { step: "Funeral Mass", description: "Celebration of funeral liturgy" },
          { step: "Committal", description: "Final prayers at the cemetery" }
        ],
        fees: "₱2,000 (Funeral Mass); ₱1,500 (church musicians, if requested); ₱500 (additional prayers)",
        contactInfo: "Parish Priest: (0917) 123-4567 | (02) 123-4567",
        order: 2,
        isActive: true
      },
      {
        name: "Holy Matrimony",
        description: "The sacrament uniting a man and woman in marriage before God, establishing a covenant of love and fidelity.",
        image: "/images/wedding.jpg",
        requirements: [
          "Baptismal certificates (recent copies for both bride and groom)",
          "Confirmation certificates (for both parties)",
          "Civil marriage license (valid Philippine marriage license)",
          "Pre-marriage counseling (canonical interview and preparation)",
          "Marriage preparation seminar (attend diocesan-approved program)"
        ],
        processSteps: [
          { step: "Initial Consultation", description: "Meet with parish priest to discuss marriage plans" },
          { step: "Document Preparation", description: "Gather and submit all required documents" },
          { step: "Marriage Preparation", description: "Complete marriage preparation program and counseling" },
          { step: "Final Arrangements", description: "Finalize ceremony details, music, and logistics" },
          { step: "Wedding Rehearsal", description: "Practice ceremony with wedding party" },
          { step: "Wedding Ceremony", description: "Celebration of Holy Matrimony" }
        ],
        fees: "₱5,000 (church fee); ₱2,000 (priest stipend); ₱3,000 (music ministry, if using parish musicians); decorations variable",
        contactInfo: "Wedding Coordinator: (02) 123-4567 ext. 102 | weddings@church.org",
        order: 3,
        isActive: true
      }
    ];
        description:
          "The sacrament of initiation into the Catholic Church, cleansing from original sin and welcoming the individual into the community of faith.",
        image: "/images/baptism.jpg",
        requirements: [
          {
            item: "Birth certificate of the child",
            required: true,
            notes: "Original or certified copy",
          },
          {
            item: "Parents' marriage certificate",
            required: true,
            notes: "If married in the Catholic Church",
          },
          {
            item: "Godparents' certificates of confirmation",
            required: true,
            notes: "Must be practicing Catholics",
          },
          {
            item: "Pre-baptismal seminar attendance",
            required: true,
            notes: "For first-time parents",
          },
        ],
        processSteps: [
          {
            step: 1,
            title: "Initial Meeting",
            description: "Meet with parish priest or deacon to discuss baptism",
            timeframe: "2-3 months before desired date",
          },
          {
            step: 2,
            title: "Document Submission",
            description: "Submit all required documents to parish office",
            timeframe: "6-8 weeks before",
          },
          {
            step: 3,
            title: "Attend Seminar",
            description: "Parents and godparents attend pre-baptismal seminar",
            timeframe: "1 month before",
          },
          {
            step: 4,
            title: "Final Preparation",
            description: "Review ceremony details and finalize arrangements",
            timeframe: "1 week before",
          },
          {
            step: 5,
            title: "Baptism Ceremony",
            description: "Celebration of the sacrament",
            timeframe: "Scheduled date",
          },
        ],
        fees: [
          {
            item: "Baptismal fee",
            amount: "₱1,000",
            notes: "Includes certificate and candle",
          },
          {
            item: "Additional donations",
            amount: "Optional",
            notes: "For church maintenance and programs",
          },
        ],
        schedule: "Sundays after 10:00 AM Mass, by appointment",
        contactPerson: "Parish Secretary",
        contactInfo: "Phone: (02) 123-4567 | Email: baptism@church.org",
        isActive: true,
      },
      {
        name: "wedding",
        title: "Holy Matrimony",
        description:
          "The sacrament uniting a man and woman in marriage before God, establishing a covenant of love and fidelity.",
        image: "/images/wedding.jpg",
        requirements: [
          {
            item: "Baptismal certificates",
            required: true,
            notes: "For both bride and groom, recent copies",
          },
          {
            item: "Confirmation certificates",
            required: true,
            notes: "For both parties",
          },
          {
            item: "Civil marriage license",
            required: true,
            notes: "Valid Philippine marriage license",
          },
          {
            item: "Pre-marriage counseling",
            required: true,
            notes: "Canonical interview and preparation",
          },
          {
            item: "Marriage preparation seminar",
            required: true,
            notes: "Attend diocesan-approved program",
          },
        ],
        processSteps: [
          {
            step: 1,
            title: "Initial Consultation",
            description: "Meet with parish priest to discuss marriage plans",
            timeframe: "6 months before",
          },
          {
            step: 2,
            title: "Document Preparation",
            description: "Gather and submit all required documents",
            timeframe: "4-5 months before",
          },
          {
            step: 3,
            title: "Marriage Preparation",
            description: "Complete marriage preparation program and counseling",
            timeframe: "3-4 months before",
          },
          {
            step: 4,
            title: "Final Arrangements",
            description: "Finalize ceremony details, music, and logistics",
            timeframe: "1 month before",
          },
          {
            step: 5,
            title: "Wedding Rehearsal",
            description: "Practice ceremony with wedding party",
            timeframe: "1-2 days before",
          },
          {
            step: 6,
            title: "Wedding Ceremony",
            description: "Celebration of Holy Matrimony",
            timeframe: "Wedding day",
          },
        ],
        fees: [
          {
            item: "Church fee",
            amount: "₱5,000",
            notes: "Basic church usage",
          },
          {
            item: "Priest stipend",
            amount: "₱2,000",
            notes: "For the celebrating priest",
          },
          {
            item: "Music ministry",
            amount: "₱3,000",
            notes: "If using parish musicians",
          },
          {
            item: "Additional decorations",
            amount: "Variable",
            notes: "Based on chosen arrangements",
          },
        ],
        schedule: "Saturdays 2:00 PM or 4:00 PM, advance booking required",
        contactPerson: "Wedding Coordinator",
        contactInfo:
          "Phone: (02) 123-4567 ext. 102 | Email: weddings@church.org",
        isActive: true,
      },
      {
        name: "burial",
        title: "Christian Burial",
        description:
          "The Church's final farewell to the faithful departed, commending their soul to God's mercy and celebrating the hope of resurrection.",
        image: "/images/burial.jpg",
        requirements: [
          {
            item: "Death certificate",
            required: true,
            notes: "Official death certificate from authorities",
          },
          {
            item: "Baptismal certificate of deceased",
            required: true,
            notes: "If available, to confirm Catholic faith",
          },
          {
            item: "Funeral home coordination",
            required: true,
            notes: "Church must coordinate with funeral director",
          },
        ],
        processSteps: [
          {
            step: 1,
            title: "Contact Parish",
            description: "Family contacts parish office to arrange funeral",
            timeframe: "As soon as possible",
          },
          {
            step: 2,
            title: "Documentation",
            description: "Submit required documents and arrange details",
            timeframe: "Within 24 hours",
          },
          {
            step: 3,
            title: "Wake Service",
            description: "Prayer service at funeral home or church",
            timeframe: "1-2 days before burial",
          },
          {
            step: 4,
            title: "Funeral Mass",
            description: "Celebration of funeral liturgy",
            timeframe: "Day of burial",
          },
          {
            step: 5,
            title: "Committal",
            description: "Final prayers at the cemetery",
            timeframe: "After funeral Mass",
          },
        ],
        fees: [
          {
            item: "Funeral Mass",
            amount: "₱2,000",
            notes: "Basic church service",
          },
          {
            item: "Church musicians",
            amount: "₱1,500",
            notes: "If parish choir is requested",
          },
          {
            item: "Additional prayers",
            amount: "₱500",
            notes: "For extended prayer services",
          },
        ],
        schedule: "Monday to Saturday, times arranged with funeral director",
        contactPerson: "Parish Priest",
        contactInfo: "Emergency: (0917) 123-4567 | Office: (02) 123-4567",
        isActive: true,
      },
    ];

  await Sacrament.insertMany(sacraments);
  console.log("✅ Sacraments seeded successfully");

    console.log("\n🎉 All content data seeded successfully!");
    console.log("\n📋 Summary:");
    console.log(`- ${pageContents.length} page contents created`);
    console.log(`- ${services.length} services created`);
    console.log(`- ${sacraments.length} sacraments created`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedContentData();
