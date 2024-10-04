import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', rupees: 160 },
  { month: 'Feb', rupees: 50 },
  { month: 'Mar', rupees: 180 },
  { month: 'Apr', rupees: 140 },
  { month: 'May', rupees: 30 },
  { month: 'Jun', rupees: 210 },
  { month: 'Jul', rupees: 180 },
  { month: 'Aug', rupees: 40 },
  { month: 'Sep', rupees: 170 },
  { month: 'Oct', rupees: 220 },
  { month: 'Nov', rupees: 190 },
  { month: 'Dec', rupees: 220 },
];

const CustomDot = (props) => {
  const { cx, cy, fill } = props;
  return <circle cx={cx} cy={cy} r={4} fill={fill} stroke="none" />;
};

const Rechartjs = () => {
  const [chartHeight, setChartHeight] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight <= 768) {
        setChartHeight(190); // Set height for screens 768px and below
      } else if (window.innerWidth < 1480 && window.innerWidth > 1080) {
        setChartHeight(250); // Larger height for medium screens
      } else {
        setChartHeight(200); // Original height for larger screens
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid 
          vertical={true} 
          horizontal={true} 
          stroke="#e0e0e0"  // Very light gray color
          strokeWidth={0.5}
          verticalStrokeDasharray="0"  // Solid vertical lines
          horizontalStrokeDasharray="3 3"  // Dotted horizontal lines
          fillOpacity={0.2}
        />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis domain={[0, 250]} tickCount={6} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Area
          type="linear"
          dataKey="rupees"
          stroke="green"
          fill="green"
          fillOpacity={0.1}
          activeDot={{ r: 8, fill: "green" }}
          dot={<CustomDot fill="green" />}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Rechartjs;
