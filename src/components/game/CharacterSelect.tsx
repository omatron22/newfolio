'use client';

import React from 'react';

interface CharacterSelectProps {
  onSelectCharacter: (character: string) => void;
}

export default function CharacterSelect({ onSelectCharacter }: CharacterSelectProps) {
  return (
    <div
      className="relative w-[800px] h-[460px] mx-auto border-[8px] border-base-300 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gradient-to-b from-base-100 to-base-200 box-border overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(/assets/choose.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center w-full h-full">
        <div className="flex items-end h-full pb-[106.67px] relative">
          {/* Left Character (Birthday) */}
          <div
            className="group absolute left-[20%] bottom-[53.33px] transform translate-x-[-50%]"
            onClick={() => onSelectCharacter('birthday')}
          >
            <img
              src="/assets/birthday.png"
              alt="Birthday Character"
              className="cursor-pointer group-hover:scale-110 transition-transform duration-500"
              style={{
                width: '230px',
                height: 'auto',
              }}
            />
          </div>

          {/* Middle Character (OG) */}
          <div
            className="group absolute left-1/2 bottom-[74.67px] transform translate-x-[-50%]"
            onClick={() => onSelectCharacter('og')}
          >
            <img
              src="/assets/OG.png"
              alt="OG Character"
              className="cursor-pointer group-hover:scale-110 transition-transform duration-500"
              style={{
                width: '160px',
                height: 'auto',
              }}
            />
          </div>

          {/* Right Character (Jeans) */}
          <div
            className="group absolute right-[20%] bottom-[48px] transform translate-x-[50%]"
            onClick={() => onSelectCharacter('jeans')}
          >
            <img
              src="/assets/jeans.png"
              alt="Jeans Character"
              className="cursor-pointer group-hover:scale-110 transition-transform duration-500"
              style={{
                width: '160px',
                height: 'auto',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}