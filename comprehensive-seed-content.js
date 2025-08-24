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
        name: "Religious Education",
        description:
          "Comprehensive faith formation programs for children, youth, and adults to deepen understanding of Catholic teachings and traditions.",
        image: "/images/religious-education.jpg",
        requirements: [
          "Registration form completed",
          "Baptismal certificate (for children)",
          "Parent/guardian participation (for minors)",
        ],
        processSteps: [
          {
            step: "Registration",
            description:
              "Complete registration form and provide required documents",
          },
          {
            step: "Orientation",
            description: "Attend orientation session for parents and students",
          },
          {
            step: "Classes Begin",
            description: "Regular weekly classes begin according to schedule",
          },
        ],
        fees: "₱500 per academic year",
        contactInfo: "Contact the Parish Office at (02) 123-4567",
        order: 1,
        isActive: true,
      },
      {
        name: "Youth Ministry",
        description:
          "Dynamic programs and activities designed to engage young people in faith, fellowship, and service to the community.",
        image: "/images/youth-ministry.jpg",
        requirements: [
          "Ages 13-25",
          "Parent/guardian consent (for minors)",
          "Commitment to participation",
        ],
        processSteps: [
          {
            step: "Introduction",
            description: "Attend a youth ministry meeting or event",
          },
          {
            step: "Registration",
            description: "Complete registration and provide emergency contacts",
          },
          {
            step: "Participation",
            description: "Join regular activities and ministry programs",
          },
        ],
        fees: "Free - donations welcome",
        contactInfo: "Youth Minister: youthministry@church.org",
        order: 2,
        isActive: true,
      },
      {
        name: "Pastoral Care",
        description:
          "Spiritual support and guidance for parishioners during times of illness, grief, celebration, and spiritual growth.",
        image: "/images/pastoral-care.jpg",
        requirements: [
          "Request through parish office",
          "Specific needs assessment",
        ],
        processSteps: [
          {
            step: "Contact",
            description: "Call parish office to request pastoral care",
          },
          {
            step: "Assessment",
            description: "Pastor or pastoral team assesses specific needs",
          },
          {
            step: "Care Provided",
            description: "Ongoing pastoral support as needed",
          },
        ],
        fees: "Free of charge",
        contactInfo: "Parish Office: (02) 123-4567",
        order: 3,
        isActive: true,
      },
      {
        name: "Community Outreach",
        description:
          "Programs to serve the poor, elderly, and marginalized in our community through various charitable initiatives.",
        image: "/images/community-outreach.jpg",
        requirements: [
          "Volunteer registration",
          "Background check (for certain programs)",
          "Commitment to service",
        ],
        processSteps: [
          {
            step: "Volunteer Sign-up",
            description: "Register as a volunteer through parish office",
          },
          {
            step: "Training",
            description: "Attend orientation and training sessions",
          },
          {
            step: "Service",
            description: "Participate in outreach activities",
          },
        ],
        fees: "No fees - donations of time and resources welcome",
        contactInfo: "Outreach Coordinator: outreach@church.org",
        order: 4,
        isActive: true,
      },
    ];

    await Service.insertMany(services);
    console.log("✅ Services seeded successfully");

    // Seed Sacraments
    const sacraments = [
      {
        name: "baptism",
        title: "Holy Baptism",
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
