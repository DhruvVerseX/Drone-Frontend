// Technical figures verified against DJI's published specifications on 2026-09-05.
export const sourceDate = "2026-09-05";

// Product photographs are unmodified DJI assets; source pages retain their copyrights.
export const imageSources = {
  "/images/dji-aerial-02.jpg": "https://www-cdn.djiits.com/dps/495dad43c8f53af4cf43f02d41cb42b6.jpg",
  "/images/dji-aerial-03.jpg": "https://www-cdn.djiits.com/dps/646b44008b76a807b3ddc7a12b339457.jpg",
  "/images/mavic-product.png": "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/85307309b931a92bacba6b97aecec0c7%40retina_small.png",
};

export const citations = [
  { label: "DJI Mavic 3 Pro specifications", url: "https://www.dji.com/mavic-3-pro/specs" },
  { label: "DJI Mavic 3 Pro product announcement", url: "https://www.dji.com/newsroom/news/dji-reinvents-aerial-storytelling-with-worlds-first-three-optical-camera-drone" },
];

export const cameras = [
  {
    name: "Hasselblad camera", focalLength: "24", sensor: "4/3 CMOS",
    resolution: "20 MP", aperture: "f/2.8–f/11",
    description: "Let the whole landscape in. A large sensor and adjustable aperture bring texture, natural color, and fine detail to every wide view.",
  },
  {
    name: "Medium tele camera", focalLength: "70", sensor: '1/1.3″ CMOS',
    resolution: "48 MP", aperture: "f/2.8",
    description: "Find a different layer of the story. A tighter perspective creates depth and draws the eye to your subject within the landscape.",
  },
  {
    name: "Tele camera", focalLength: "166", sensor: '1/2″ CMOS',
    resolution: "12 MP", aperture: "f/3.4",
    description: "Discover what distance keeps hidden. Bring distant details into the frame with a dedicated telephoto perspective.",
  },
];

export const specs = [
  { heading: "Aircraft", rows: [
    { label: "Takeoff weight", value: "958 g" },
    { label: "Maximum flight time", value: "43 minutes¹" },
    { label: "Maximum horizontal speed", value: "21 m/s" },
    { label: "Wind resistance", value: "12 m/s" },
    { label: "Folded dimensions", value: "231.1 × 98 × 95.4 mm" },
  ] },
  { heading: "Imaging", rows: [
    { label: "Camera system", value: "24 / 70 / 166 mm equivalent" },
    { label: "Hasselblad video", value: "5.1K / 50 fps" },
    { label: "All three cameras", value: "4K / 60 fps" },
    { label: "Gimbal", value: "3-axis mechanical stabilization" },
    { label: "Internal storage", value: "8 GB" },
  ] },
  { heading: "Flight intelligence", rows: [
    { label: "Obstacle sensing", value: "Omnidirectional" },
    { label: "Assistance system", value: "APAS 5.0" },
    { label: "Subject tracking", value: "ActiveTrack 5.0" },
    { label: "Automated capture", value: "MasterShots / Waypoint Flight" },
    { label: "Return to home", value: "Advanced RTH" },
  ] },
  { heading: "Transmission", rows: [
    { label: "Video transmission", value: "DJI O3+" },
    { label: "Maximum range", value: "15 km (FCC)²" },
    { label: "CE / SRRC / MIC range", value: "8 km²" },
    { label: "Live view", value: "1080p / 60 fps" },
    { label: "Standard controllers", value: "DJI RC / RC Pro / RC-N1" },
  ] },
];

export const specificationNotes = [
  "¹ Maximum flight time measured under controlled, windless conditions at 32.4 kph until battery depletion. Actual results vary with conditions, use, and firmware.",
  "² Maximum communication range measured outdoors without obstruction or interference. One-way, non-return measurement; actual range varies. Observe local rules and visual line of sight.",
  "Focal lengths are 35 mm format equivalents. Dimensions exclude propellers. Apple ProRes and the 1 TB SSD are exclusive to Mavic 3 Pro Cine.",
];
