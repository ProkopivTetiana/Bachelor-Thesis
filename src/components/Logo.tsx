import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="flex">
      <Link href={`/`}>
        <div className="text-2xl font-bold text-orange-600">BookXchange</div>
      </Link>
    </div>
  );
};

export default Logo;
