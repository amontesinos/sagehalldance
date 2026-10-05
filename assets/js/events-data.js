/**
 * Sage Hall Dance - Venues & Event Schedule Data
 */

export const VENUES = {
  fairgrounds: {
    id: 'fairgrounds',
    name: 'Fairgrounds Event Center',
    fullName: 'Cache County Event Center / Fairgrounds',
    address: '490 S 500 W, Logan, UT 84321',
    mapUrl: 'https://maps.google.com/?q=Cache+County+Event+Center+Logan+UT',
    ageRestriction: 'All Ages',
    badgeClass: 'badge-all-ages',
    description: 'Spacious hardwood floor with plenty of room for aerials, dips, and large social crowds.'
  },
  mountain_valley: {
    id: 'mountain_valley',
    name: 'Mountain Valley Athletics',
    fullName: 'Mountain Valley Athletics',
    address: 'Logan, UT',
    mapUrl: 'https://maps.google.com/?q=Mountain+Valley+Athletics+Logan+UT',
    ageRestriction: 'All Ages',
    badgeClass: 'badge-all-ages',
    description: 'High energy student atmosphere with dynamic sound, beginner lessons, and great vibes.'
  },
  cache_bar: {
    id: 'cache_bar',
    name: 'Cache Bar',
    fullName: 'The Cache Bar (21+)',
    address: '119 S Main St, Logan, UT 84321',
    mapUrl: 'https://maps.google.com/?q=119+S+Main+St+Logan+UT',
    ageRestriction: '21+ Only (Valid ID required)',
    badgeClass: 'badge-21',
    description: 'Intimate country swing night with craft drinks, live DJ, and social dancing downtown.'
  }
};

// Generate realistic dates based on the current/upcoming month so the demo always looks fresh
function getDynamicEvents() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed

  // Format helper YYYY-MM-DD
  const makeDate = (day) => {
    const d = new Date(year, month, day);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  return [
    {
      id: 'sh-1',
      title: 'Country Swing & Line Dancing',
      date: makeDate(1),
      time: '8:00 PM - 11:30 PM',
      lessonTime: '8:00 PM (Beginner & Intermediate)',
      socialTime: '9:00 PM - 11:30 PM',
      venueId: 'fairgrounds',
      price: '$8 Cash / Card / Venmo',
      theme: 'Classic Country Night',
      instructors: 'Sage Hall Crew',
      notes: 'No partner or experience needed. Leather-soled boots or slick sneakers recommended!'
    },
    {
      id: 'sh-2',
      title: 'Thursday Night Swing & Two-Step',
      date: makeDate(3),
      time: '9:00 PM - Midnight',
      lessonTime: '9:00 PM (Quick Lesson)',
      socialTime: '9:30 PM - Midnight',
      venueId: 'mountain_valley',
      price: '$8 Entry',
      theme: 'Aggie Night (Show USU ID for $1 off)',
      instructors: 'Guest Instructors',
      notes: 'High energy country swing, dips, and line dances between sets.'
    },
    {
      id: 'sh-3',
      title: 'Fairgrounds Country Social',
      date: makeDate(8),
      time: '8:00 PM - 11:30 PM',
      lessonTime: '8:00 PM (Country Swing Basics)',
      socialTime: '9:00 PM - 11:30 PM',
      venueId: 'fairgrounds',
      price: '$8 Entry',
      theme: 'Denim & Flannel Night',
      instructors: 'Sage Hall Crew',
      notes: 'Lessons rotate every week to teach you new moves and tricks!'
    },
    {
      id: 'sh-4',
      title: 'Wednesday Country Night (21+)',
      date: makeDate(9),
      time: '7:00 PM - 11:00 PM',
      lessonTime: '7:30 PM (Swing Foundations)',
      socialTime: '8:15 PM - 11:00 PM',
      venueId: 'cache_bar',
      price: '$5 Cover (Must be 21+ with ID)',
      theme: 'Downtown 21+ Social',
      instructors: 'Logan Country Dancers',
      notes: 'Great drinks, acoustic intermission, and laid-back social dancing.'
    },
    {
      id: 'sh-5',
      title: 'Thursday Swing Stampede',
      date: makeDate(10),
      time: '9:00 PM - Midnight',
      lessonTime: '9:00 PM',
      socialTime: '9:30 PM - Midnight',
      venueId: 'mountain_valley',
      price: '$8 Entry',
      theme: 'Country Hits & 90s Throwbacks',
      instructors: 'Sage Hall Team',
      notes: 'Water stations available. Bring your friends!'
    },
    {
      id: 'sh-6',
      title: 'Tuesday Swing Session',
      date: makeDate(15),
      time: '8:00 PM - 11:30 PM',
      lessonTime: '8:00 PM (Acro & Dip Safety)',
      socialTime: '9:00 PM - 11:30 PM',
      venueId: 'mountain_valley',
      price: '$8 Entry',
      theme: 'Tricks & Dips Workshop',
      instructors: 'Sage Hall Staff',
      notes: 'Special workshop on safe aerials and dips for social floors.'
    },
    {
      id: 'sh-7',
      title: 'Big Thursday Dance Night',
      date: makeDate(17),
      time: '9:00 PM - Midnight',
      lessonTime: '9:00 PM',
      socialTime: '9:30 PM - Midnight',
      venueId: 'mountain_valley',
      price: '$8 Entry',
      theme: 'Red Dirt & Modern Country',
      instructors: 'Sage Hall Crew',
      notes: 'Line dance tutorials during intermissions: Shivers, Copperhead Road, & more.'
    },
    {
      id: 'sh-8',
      title: 'Weekend Saturday Showdown',
      date: makeDate(19),
      time: '9:00 PM - 12:30 AM',
      lessonTime: '9:00 PM (All Levels)',
      socialTime: '9:45 PM - 12:30 AM',
      venueId: 'mountain_valley',
      price: '$10 Entry',
      theme: 'Saturday Night Social',
      instructors: 'Sage Hall Crew',
      notes: 'The biggest social dance of the weekend!'
    },
    {
      id: 'sh-9',
      title: 'Fairgrounds Swing Night',
      date: makeDate(22),
      time: '8:00 PM - 11:30 PM',
      lessonTime: '8:00 PM',
      socialTime: '9:00 PM - 11:30 PM',
      venueId: 'fairgrounds',
      price: '$8 Entry',
      theme: 'Country Swing & Two-Step Mix',
      instructors: 'Sage Hall Crew',
      notes: 'Lots of floor space, great for practicing larger travel moves.'
    },
    {
      id: 'sh-10',
      title: 'Cache Bar Swing & Sips (21+)',
      date: makeDate(23),
      time: '7:00 PM - 11:00 PM',
      lessonTime: '7:30 PM',
      socialTime: '8:15 PM - 11:00 PM',
      venueId: 'cache_bar',
      price: '$5 Cover (21+)',
      theme: 'Wednesday Social Mixer',
      instructors: 'Logan Country Dancers',
      notes: 'Casual and fun. Come for dinner, stay for the dancing!'
    },
    {
      id: 'sh-11',
      title: 'Thursday Mountain Valley Throwdown',
      date: makeDate(24),
      time: '9:00 PM - Midnight',
      lessonTime: '9:00 PM',
      socialTime: '9:30 PM - Midnight',
      venueId: 'mountain_valley',
      price: '$8 Entry',
      theme: 'Line Dance Frenzy & Country Swing',
      instructors: 'Sage Hall Team',
      notes: 'Line dance teach at 10:15 PM.'
    },
    {
      id: 'sh-12',
      title: 'End of Month Swing Finale',
      date: makeDate(29),
      time: '8:00 PM - 11:30 PM',
      lessonTime: '8:00 PM',
      socialTime: '9:00 PM - 11:30 PM',
      venueId: 'mountain_valley',
      price: '$8 Entry',
      theme: 'Monthly Finale Dance',
      instructors: 'Sage Hall Crew',
      notes: 'Wrap up the month with your favorite tunes and best partner!'
    }
  ];
}

export const INITIAL_EVENTS = getDynamicEvents();

export const REELS_DATA = [
  {
    id: 'reel-1',
    title: 'Beginner Swing Turn Combo 🔥',
    subtitle: 'Learn the basic inside roll to pretzel in 30 seconds',
    views: '14.2K',
    likes: '1.2K',
    duration: '0:35',
    thumbnail: 'assets/img/reel1.jpg',
    videoType: 'tutorial',
    tag: 'Tutorial',
    caption: 'Try this move at our Tuesday night lesson at Fairgrounds! Beginner lesson starts at 8 PM. #countryswing #danceutah #sagehalldance',
    instagramUrl: 'https://www.instagram.com/sagehalldance/'
  },
  {
    id: 'reel-2',
    title: 'Saturday Night Energy at Mountain Valley 🤠',
    subtitle: 'Over 200 dancers packed the floor this weekend!',
    views: '28.5K',
    likes: '2.4K',
    duration: '0:45',
    thumbnail: 'assets/img/reel2.jpg',
    videoType: 'social',
    tag: 'Social Highlights',
    caption: 'Nothing beats Cache Valley on a Saturday night! Tag your dance partner 👇 #sagehalldance #loganutah #dancetok',
    instagramUrl: 'https://www.instagram.com/sagehalldance/'
  },
  {
    id: 'reel-3',
    title: 'Dip Safety 101: Never Drop Your Follow! 👢',
    subtitle: 'Weight transfer and frame tips from our instructors',
    views: '19.8K',
    likes: '1.8K',
    duration: '0:50',
    thumbnail: 'assets/img/reel3.jpg',
    videoType: 'tips',
    tag: 'Technique Tip',
    caption: 'Safety first on the social floor. Keep your core engaged and support the back! #dancetips #countryswingdance',
    instagramUrl: 'https://www.instagram.com/sagehalldance/'
  },
  {
    id: 'reel-4',
    title: 'Line Dance Teach: Good Time by Niko Moon 🎵',
    subtitle: 'Count-in and footwork breakdown',
    views: '11.6K',
    likes: '950',
    duration: '0:40',
    thumbnail: 'assets/img/reel4.jpg',
    videoType: 'linedance',
    tag: 'Line Dance',
    caption: 'Our favorite intermission line dance! Learn the steps before Thursday night. #linedance #countrymusic',
    instagramUrl: 'https://www.instagram.com/sagehalldance/'
  }
];
