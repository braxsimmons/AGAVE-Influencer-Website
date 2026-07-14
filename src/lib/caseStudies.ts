export interface FunnelQuestion {
  prompt: string;
  options: string[];
  responsesLabel?: string;
}

export interface Campaign {
  label?: string;
  overview: string;
  metrics: { label: string; value: string }[];
  keyResults?: string;
  keyStats?: { label: string; value: string }[];
  funnel: FunnelQuestion[];
}

export interface CaseStudy {
  id: string;
  name: string;
  /** Short, friendly name used in the modal CTA ("Want results like ___?"). */
  ctaName: string;
  type: string;
  image: string;
  /** How the image fills its card. "cover" (default) fills edge-to-edge; "contain" centers a logo without cropping. */
  imageFit?: "cover" | "contain";
  /** Overrides the fit for the gallery card only (carousel keeps imageFit). */
  galleryFit?: "cover" | "contain";
  /** CSS object-position for cover images (e.g. "center 30%"). Defaults to "center top". */
  imagePosition?: string;
  blurb: string;
  highlight: string;
  campaigns: Campaign[];
  summary?: string;
  summaryStats?: { label: string; value: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "braiden-shaw",
    name: "Braiden Shaw",
    ctaName: "Braiden",
    type: "Personal Finance Creator",
    image: "/influencers/braiden.jpeg",
    imagePosition: "center 58%",
    blurb:
      "A personal finance creator who turned his audience into an owned database — and grew revenue per user 8x across six consecutive AGAVE campaigns.",
    highlight: "8x revenue per user over 6 campaigns",
    campaigns: [
      {
        label: "Campaign 1",
        overview:
          "The first Braiden Shaw campaign utilized a series of funnels to learn which provided the most value to his audience in the AGAVE context.",
        metrics: [
          { label: "Users", value: "20,074" },
          { label: "Duration", value: "45 hrs" },
          { label: "Revenue", value: "$42,569" },
          { label: "Revenue / User", value: "$2.12" },
        ],
        keyResults:
          "116 people opted into the $1 trial to Amplifi Community. Average LTV for trials was $121.",
        keyStats: [
          { label: "Amplifi Community", value: "$13,920" },
          { label: "HYSA", value: "$18,318" },
          { label: "Credit Card", value: "$2,331" },
          { label: "Mortgage Refinance", value: "$8,000" },
        ],
        funnel: [
          {
            prompt:
              "I genuinely love working hard to provide the best content for my followers. What best describes where you're at in your financial journey?",
            options: [
              "Working hard to get out of debt",
              "Actively looking for investments to grow my wealth",
              "Wanting to start a side hustle to generate extra income",
              "Other",
            ],
          },
          {
            prompt:
              "Amplifi is a community that provides education and resources to get out of debt while learning how to invest and improve your financial situation. What is currently your biggest challenge?",
            options: [
              "Student loan payments",
              "High interest consumer debt",
              "Finding the right job for my skill set",
              "Other",
            ],
          },
          {
            prompt:
              "You don't have to do it alone. Consider an exclusive $1 trial to my Amplifi Foundations course. You get access to my complete library of courses, live Q&As, and guided tools to help you reach your goals. Are you interested in starting a $1 trial today? Only available during this giveaway.",
            options: ["Yes, please text me the link", "No thanks"],
            responsesLabel: "All Responses",
          },
        ],
      },
      {
        label: "Campaign 2",
        overview:
          "The second campaign introduced Capita Financial Network, a new partner brought by AGAVE. It focused on finding users interested in financial planning and scheduling consultations with Capita. Over three days of gameplay, the giveaway sourced over $10M in assets under management for Capita.",
        metrics: [
          { label: "Users", value: "28,669" },
          { label: "Duration", value: "53 hrs" },
          { label: "Revenue", value: "$55,562" },
          { label: "Revenue / User", value: "$1.94" },
        ],
        keyResults: "Sourced $10M+ in assets under management for Capita in 4 days, with a 50% increase in users.",
        funnel: [
          {
            prompt:
              "How many of you have started to tackle your financial planning and felt overwhelmed during the process?",
            options: ["Definitely not me", "Maybe me", "Definitely me", "Plead the 5th"],
          },
          {
            prompt:
              "If you could get free unbiased professional advice in any area of your financial life, what would it be?",
            options: [
              "Am I investing the right way for retirement?",
              "Tax Strategy... am I doing it right?",
              "Estate planning... best for my kids",
              "How do I get started?",
            ],
          },
          {
            prompt:
              "I hear these questions all the time, so I partnered with Capita, a financial advisory firm I trust, to provide free advice and consultation just for members of my giveaway. Want a professional review of your situation? It's free. How would you like to proceed?",
            options: ["I need this, please have them call me.", "I might be interested", "No, thanks"],
            responsesLabel: "All Responses",
          },
        ],
      },
      {
        label: "Campaign 3",
        overview:
          "This campaign focused on getting users to attend a virtual webinar — Braiden's opportunity to engage directly with his audience and sell his Amplifi Community. In 4 days, 881 people attended his webinar for an average of 29 minutes.",
        metrics: [
          { label: "Users", value: "14,659" },
          { label: "Duration", value: "44 hrs" },
          { label: "Direct Revenue", value: "$34,212" },
          { label: "Revenue / User", value: "$2.33" },
        ],
        keyResults: "881 webinar attendees averaging 29 minutes of watch time.",
        funnel: [
          {
            prompt:
              "I genuinely love working hard to provide the best content for my followers. What best describes where you're at in your financial journey?",
            options: [
              "Working hard to get out of debt",
              "Actively looking for investments to grow my wealth",
              "Wanting to start a side hustle to generate extra income",
              "Other",
            ],
          },
          {
            prompt:
              "Tonight I'm holding a live webinar to discuss the best tax and investment strategies and opportunities. I'll also open it up for Q&A. Is this something that might interest you?",
            options: ["Yes", "Maybe, when is it?", "No, thanks"],
          },
          {
            prompt:
              "This live webinar will be held at the times listed below. The webinar and Q&A is 1 hour or less. To keep with Christmas I'm also giving away a luxury resort stay in each webinar. Which webinar might work for you?",
            options: [
              "Tonight at 5PM MST",
              "Tomorrow at 7PM MST",
              "Thursday at 5PM MST",
              "Saturday at 9AM MST",
            ],
            responsesLabel: "All Responses",
          },
        ],
      },
      {
        label: "Campaign 4",
        overview:
          "The February campaign introduced a Hidden Prize component, allowing anyone to “Win” $50 by opening an HYSA account. This yielded significant traffic with a change in user perception and incentives.",
        metrics: [
          { label: "Users", value: "19,615" },
          { label: "Duration", value: "54 hrs" },
          { label: "Revenue", value: "$101,430" },
          { label: "Revenue / User", value: "$5.17" },
        ],
        keyResults:
          "Of the 6,209 users presented with the HYSA Hidden Prize, 479 verified HYSA submissions yielded $118K in revenue (excluding hidden prize cost).",
        funnel: [
          {
            prompt: "Congrats, You Won! $50 Cash Incentive.",
            options: ["Claim my incentive prize!", "Text me these links so I have them", "Thanks"],
          },
          {
            prompt:
              "Step 1: Watch the Video. Step 2: Create your HYSA (it's completely free). Step 3: Verify and receive $50 cash in your Venmo — usually 15 minutes or less. Enter your phone number below to opt in and we'll send you the links via SMS.",
            options: ["Phone number opt-in"],
            responsesLabel: "All Responses",
          },
        ],
      },
      {
        label: "Campaign 5",
        overview:
          "The previous campaign generated significant volume, but the margin of error on verified accounts created HR costs. This campaign reduced that error rate, yielding an additional $60 profit per HYSA opened. It also introduced Amplifi Travel, an exclusive travel club, with 10% of all players signing up.",
        metrics: [
          { label: "Users", value: "15,788" },
          { label: "Duration", value: "52 hrs" },
          { label: "Revenue", value: "$84,136" },
          { label: "Revenue / User", value: "$5.33" },
        ],
        keyResults: "Added $60 in profit per HYSA opened; 10% of players signed up for Amplifi Travel.",
        funnel: [
          {
            prompt: "It's family travel season! Where do you book most of your hotel travel?",
            options: ["Expedia", "Priceline", "Google", "Hotel brand website", "Other"],
          },
          {
            prompt:
              "There's something better called a wholesale travel club. It gives members access to wholesale pricing, often 20%-30% off. AAA and Costco Travel are examples... but you pay for those. What if wholesale pricing was free?",
            options: ["Free.... free is good", "I can feel a vacation coming on...", "What do you mean?"],
          },
          {
            prompt:
              "I found it. It's called Amplifi Travel — and I save a ton. We can access wholesale pricing for free because we're a “club”. Click the link below and create an account for free using the code “Braiden25” (it takes 30 seconds).",
            options: ["Text me the link, I'm interested", "Thanks!", "No thanks"],
            responsesLabel: "All Responses",
          },
        ],
      },
      {
        label: "Campaign 6",
        overview:
          "The most recent campaign introduced the Growth Circle funnel — Braiden's $6,000/year membership. We tightened our funnels to identify these users and adopted a very tight call center to offer them membership.",
        metrics: [
          { label: "Users", value: "10,496" },
          { label: "Duration", value: "57 hrs" },
          { label: "Revenue", value: "$171K" },
          { label: "Revenue / User", value: "$16.29" },
        ],
        keyResults:
          "Of the 864 high net-worth users presented with the Growth Circle funnel, 38 high-quality leads converted to 15+ paid memberships.",
        funnel: [
          {
            prompt:
              "Are you at the point in your career where you want access to private market investments, large scale real estate, and venture capital deals closed to the general public?",
            options: ["Yes", "Not right now", "Maybe"],
          },
          {
            prompt:
              "My inner circle is a group of investors who I've helped take their portfolio to the next level with exclusive VC, real estate, and private market investments while cutting their tax bills in half. Is this inner circle something that might interest you?",
            options: ["Yes", "Not right now", "Maybe"],
          },
          {
            prompt:
              "I'd love to introduce myself to you. Share a brief intro of yourself and your phone number below and I'll reach out to introduce the inner circle.",
            options: ["Name + phone number submission"],
            responsesLabel: "Yes Responses",
          },
        ],
      },
    ],
    summary:
      "Each campaign gives us the opportunity to improve funnel performance, lead quality, and overall campaign economics. Over the course of six campaigns, Braiden's revenue per user increased 8x — from $2.12 to $16.29 — through incremental funnel and offer improvements.",
    summaryStats: [
      { label: "Campaign 1", value: "$2.12" },
      { label: "Campaign 2", value: "$1.94" },
      { label: "Campaign 3", value: "$2.33" },
      { label: "Campaign 4", value: "$5.17" },
      { label: "Campaign 5", value: "$5.33" },
      { label: "Campaign 6", value: "$16.29" },
    ],
  },
  {
    id: "body-by-bree",
    name: "Body by Bree",
    ctaName: "Bree",
    type: "Health & Fitness Coach",
    image: "/influencers/bodybybree.png",
    blurb:
      "A fitness coach who used an AGAVE giveaway to fill her calendar with consultations and sell out her premium 8-week coaching program.",
    highlight: "$39,759 from one funnel",
    campaigns: [
      {
        overview:
          "Body by Bree ran an AGAVE giveaway to promote her $695, 8-week course. During the giveaway, AGAVE set up over 80 consultations with Bree to sell the course — generating $32,665 in this one funnel.",
        metrics: [
          { label: "Users", value: "5,400" },
          { label: "Duration", value: "42 hrs" },
          { label: "Net Revenue", value: "$39,759" },
          { label: "Revenue / User", value: "$7.36" },
        ],
        keyResults:
          "From the 80 consultations set up by AGAVE, Bree sold 47 coaching programs at a $695 value.",
        funnel: [
          {
            prompt: "What are you most looking forward to about reaching your health and fitness goals?",
            options: [
              "Healing my relationship with food",
              "Fitting into my clothes better",
              "Finding more balance in my life",
              "Feeling confident in what I'm eating",
              "Rockin' that beach bod ;)",
            ],
          },
          {
            prompt: "What is currently your biggest obstacle to reaching your health and fitness goals?",
            options: [
              "My life is too busy!",
              "Yo-Yo dieting (We've all been there)",
              "I don't know where to get started",
              "I get discouraged about how many times I've tried",
            ],
          },
          {
            prompt:
              "A customized program with built-in accountability takes all the planning and stress out of reaching your goals. Would an 8-week customized program built to work alongside a busy schedule be beneficial to you? If yes, I'd love to connect with you to show you how…",
            options: ["Yes, I'd be up for a quick phone call to see if it could help", "No, thanks"],
            responsesLabel: "All Responses",
          },
        ],
      },
    ],
  },
  {
    id: "mended-light",
    name: "Mended Light",
    ctaName: "Mended Light",
    type: "Relationship & Therapy Creator",
    image: "/influencers/mendedlight.jpeg",
    imagePosition: "center",
    blurb:
      "Mended Light ran back-to-back AGAVE campaigns — and by tightening the funnel and adding a subscription layer, more than doubled profit per user.",
    highlight: "Profit per user $5.21 → $10.37",
    campaigns: [
      {
        label: "Campaign 1",
        overview:
          "The first Mended Light campaign focused on setting up consultations for a $2,100 six-month therapy package. AGAVE sourced 1,300 leads, set up a call center, and scheduled 412 fifteen-minute Zoom consultations. Initial revenue hit $98K, but associated costs (AGAVE licensing, HR, prizes) brought net profit to $23K.",
        metrics: [
          { label: "Users", value: "4,412" },
          { label: "Duration", value: "30 hrs" },
          { label: "Net Profit", value: "$23K" },
          { label: "Profit / User", value: "$5.21" },
        ],
        keyStats: [
          { label: "Leads", value: "1,300" },
          { label: "Appointments", value: "412" },
          { label: "Sales", value: "51" },
          { label: "Revenue", value: "$98K" },
          { label: "Cost", value: "$75K" },
          { label: "Profit", value: "$23K" },
        ],
        funnel: [
          {
            prompt: "If you could improve one relationship in your life, which relationship would it be?",
            options: ["Spouse or Ex-Spouse", "Son or Daughter", "In-Laws", "Relationship with Myself", "Other"],
          },
          {
            prompt: "Which outcome are you most hopeful for as you seek to improve this relationship?",
            options: ["Greater Peace", "To be seen and heard", "Improved Boundaries", "All of them?"],
          },
          {
            prompt:
              "Can Mended Light help you in your efforts? Successfully managing our relationships requires learned skills. We offer programs that help you internalize those skills while supporting you in your journey. If the price was right, would this be something that might help you?",
            options: ["Yes, please give me a call with more information", "No thanks, I'm not interested right now"],
            responsesLabel: "All Responses",
          },
        ],
      },
      {
        label: "Campaign 2",
        overview:
          "The second campaign focused on minimizing costs to increase net profit — tightening market questions for fewer but more qualified leads, and introducing a new funnel. A new $1 trial to the Mended Light monthly subscription yielded 210 sign-ups with 70% churn; 147 transitioned to paid with an average LTV of $126.",
        metrics: [
          { label: "Users", value: "7,522" },
          { label: "Duration", value: "55 hrs" },
          { label: "Net Profit", value: "$78K" },
          { label: "Profit / User", value: "$10.37" },
        ],
        keyStats: [
          { label: "Leads", value: "482" },
          { label: "Appointments", value: "137" },
          { label: "Sales", value: "36" },
          { label: "Revenue", value: "$83.5K" },
          { label: "Cost", value: "$24K" },
          { label: "Profit", value: "$59.5K" },
        ],
        funnel: [
          {
            prompt:
              "Which of the following therapeutic resources included in the Mended Light Membership would you be most excited about having access to?",
            options: [
              "Full access to Jonathan's video catalog",
              "Live Q&As with Mended Light",
              "Book Club (therapy edition of course)",
              "All of the Above",
            ],
          },
          {
            prompt:
              "We won't make you choose. The Mended Light membership provides all listed resources and more. As a member you'll begin healing while minimizing out-of-pocket expenses. Could this be a good fit for you?",
            options: ["Yes", "Maybe if it was $1 ;)", "No thanks"],
          },
          {
            prompt:
              "Great! Get started with a 14-day trial membership to Mended Light for only $1 by clicking the link below — available only to our giveaway entrants. (Join today and receive special access to a new member game later this week where additional luxury resort stays will be given away!)",
            options: ["Yes, please give me a call with more information", "No thanks, I'm not interested right now"],
            responsesLabel: "All Responses",
          },
        ],
      },
    ],
    summary:
      "In Campaign 2 we tightened the market-question funnel to prioritize higher-intent users. This reduced raw lead volume but doubled lead-to-sale conversion while requiring only a quarter of the consultation time — increasing profit to $59.5K. We also added a $1 free-trial subscription funnel, creating an additional $18.5K in profit from the same audience.",
    summaryStats: [
      { label: "Campaign 1 Profit/User", value: "$5.21" },
      { label: "Campaign 2 Profit/User", value: "$10.37" },
    ],
  },
  {
    id: "kelsey-nixon",
    name: "Kelsey Nixon",
    ctaName: "Kelsey",
    type: "Food & Recipe Creator",
    image: "/influencers/kelseynixon.jpg",
    blurb:
      "A food creator who used AGAVE to build her user database and promote her monthly Recipe Club subscription — growing her subscriber base 9% in 36 hours.",
    highlight: "9% subscriber growth in 36 hrs",
    campaigns: [
      {
        overview:
          "Kelsey Nixon partnered with AGAVE to begin building her user database and promote her monthly Recipe Club subscription. Within 36 hours, AGAVE led to a 9% increase in her total subscriber base.",
        metrics: [
          { label: "Users", value: "1,395" },
          { label: "Duration", value: "31 hrs" },
          { label: "Net Revenue", value: "$9,180" },
          { label: "Revenue / User", value: "$6.58" },
        ],
        keyResults:
          "Of the 364 users who indicated interest in learning more, 102 signed up for a monthly subscription ($90 LTV).",
        funnel: [
          {
            prompt: "What makes you feel most satisfied about a successful mealtime at home?",
            options: [
              "The creative process of making something new",
              "Enjoying a great meal without going out to eat",
              "Knowing I am saving money by dining in",
              "The feeling of connection from eating together as a family",
              "Other",
            ],
          },
          {
            prompt: "What is currently your biggest obstacle to enjoying mealtime in your home?",
            options: [
              "It feels chaotic and rushed",
              "I'm in a rut with my usual recipes",
              "There's never enough time to make the meals I'd like",
              "It's too difficult to find recipes the whole family enjoys",
            ],
          },
          {
            prompt:
              "Coming up with what to make for dinner can be a headache, and many recipes are time-consuming. I created Recipe Club to help. Every month we send you 5 new, quick, easy recipes — plus weekly and monthly meal plans with one-click grocery lists sent to your favorite grocer. Would something like this interest you?",
            options: ["Yes, that would interest me", "No thanks, I'm not interested right now"],
            responsesLabel: "All Responses",
          },
        ],
      },
    ],
  },
  {
    id: "russ-flips-whips",
    name: "Russ Flips Whips",
    ctaName: "Russ Flips Whips",
    type: "Automotive Creator",
    image: "/influencers/russ.jpg",
    blurb:
      "An automotive creator who paired a car-buying webinar with financial-services offers to monetize a high-intent audience.",
    highlight: "$28K revenue · 6,401 users",
    campaigns: [
      {
        overview:
          "RussFlipsWhips partnered with AGAVE in May 2025. The campaign utilized funnels from Braiden Shaw, a webinar with a direct opportunity to engage and market to users, and auto-services-related offers.",
        metrics: [
          { label: "Users", value: "6,401" },
          { label: "Duration", value: "51 hrs" },
          { label: "Total Revenue", value: "$28K" },
          { label: "Revenue / User", value: "$4.37" },
        ],
        keyResults:
          "Despite over 50% of leads not qualifying for offers (low credit scores), 35 opened a HYSA account, yielding $300 per account.",
        funnel: [
          {
            prompt:
              "Think about the next car you want to buy. What worries you most when buying a vehicle for yourself?",
            options: [
              "Am I getting the best deal?",
              "Is this the right car for me?",
              "Am I getting the best financing terms?",
              "Is this car going to last?",
              "Other",
            ],
          },
          {
            prompt:
              "I really know how to buy cars and get the right price and terms. It's something I do really well and I want to teach you through a free 30-minute webinar as my way of giving back. Is this something that might interest you?",
            options: ["Yes, I want the upper hand in car buying", "Maybe, when is it?", "No, thanks"],
          },
          {
            prompt:
              "My next webinar starts in 9 minutes. Space is limited but pick the time that works for you. I'll be taking questions AND giving away a luxury resort vacation at the end of each day to one attendee. (Selecting a time auto-registers you with email + SMS confirmation.)",
            options: ["Today in 8 minutes", "Tonight at 8PM EST"],
            responsesLabel: "Yes & Maybe Responses",
          },
        ],
      },
    ],
  },
  {
    id: "lella-boutique",
    name: "Lella Boutique",
    ctaName: "Lella Boutique",
    type: "Quilting & Crafts Creator",
    image: "/influencers/lellaboutique.jpg",
    blurb:
      "A quilting creator who partnered with Missouri Star Quilting Co. on an AGAVE campaign to launch a new template — driving 304 attributable sales.",
    highlight: "304 sales · $10,640 revenue",
    campaigns: [
      {
        overview:
          "Lella Boutique partnered with Missouri Star Quilting Company to run an AGAVE campaign focused on engaging her followers and promoting the launch of a new quilting template. The campaign yielded 304 attributable sales and $10,640 in revenue.",
        metrics: [
          { label: "Users", value: "2,405" },
          { label: "Duration", value: "30 hrs" },
          { label: "Net Revenue", value: "$10,640" },
          { label: "Revenue / User", value: "$4.42" },
        ],
        keyResults:
          "Of the 368 responses indicating interest in the daily deal, 240 purchased a new product within 36 hours.",
        funnel: [
          {
            prompt:
              "I love that Missouri Star is partnering with me on this incredible giveaway... have you shopped with them before?",
            options: ["Yes, I love them!", "A few times", "No, not yet"],
          },
          {
            prompt: "Where is your favorite place to buy fabric?",
            options: ["Etsy", "Joanns", "I shop local", "Fat Quarter Shop", "Other"],
          },
          {
            prompt:
              "One of my favorite things about Missouri Star is their daily deals! Check out the daily deal at the link below. (Buy the daily deal today and you'll receive a chance to win one of 3 extra vacation packages Missouri Star is giving to first-time shoppers.)",
            options: ["Please send me the link so I have it!", "I'm interested and I have the link!", "No, thanks"],
            responsesLabel: "All Responses",
          },
        ],
      },
    ],
  },
];
