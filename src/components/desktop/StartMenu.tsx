'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: string) => void;
}

const MENU_ITEMS = [
  { id: 'about', label: 'About.txt', icon: '/icons/text-file.png' },
  { id: 'projects', label: 'Projects', icon: '/icons/folder.png' },
  { id: 'game', label: 'Samson.exe', icon: '/icons/game.png' },
  { id: 'blog', label: 'Blog.txt', icon: '/icons/notepad.png' },
  { id: 'resume', label: 'Resume.pdf', icon: '/icons/document.png' },
];

const LINKS = [
  { label: 'LinkedIn', icon: '/icons/link.png', href: 'https://www.linkedin.com/in/omaresp22/' },
  { label: 'GitHub', icon: '/icons/computer.png', href: 'https://github.com/omatron22' },
  { label: 'Email', icon: '/icons/mail.png', href: 'mailto:omaresp35@gmail.com' },
];

export default function StartMenu({ isOpen, onClose, onOpenWindow }: StartMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[9996]" onClick={onClose} />

          {/* Menu */}
          <motion.div
            className="win-start-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.1 }}
          >
            {/* Blue sidebar */}
            <div className="flex">
              <div className="w-[28px] bg-win-navy flex items-end justify-center pb-3">
                <span
                  className="text-white text-[12px] font-bold"
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    letterSpacing: '2px',
                  }}
                >
                  Omar95
                </span>
              </div>

              <div className="flex-1">
                {/* Programs */}
                {MENU_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="win-menu-item"
                    onClick={() => {
                      if (item.id === 'resume') {
                        window.open('/images/resume.pdf', '_blank');
                      } else {
                        onOpenWindow(item.id);
                      }
                      onClose();
                    }}
                  >
                    <Image src={item.icon} alt="" width={16} height={16} />
                    <span>{item.label}</span>
                  </div>
                ))}

                <div className="win-menu-separator" />

                {/* Links */}
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="win-menu-item no-underline text-inherit"
                    onClick={onClose}
                  >
                    <Image src={link.icon} alt="" width={16} height={16} />
                    <span>{link.label}</span>
                  </a>
                ))}

                <div className="win-menu-separator" />

                {/* Shut Down */}
                <div
                  className="win-menu-item"
                  onClick={() => {
                    onClose();
                    document.body.style.transition = 'opacity 1s';
                    document.body.style.opacity = '0';
                    setTimeout(() => {
                      document.body.style.opacity = '1';
                    }, 2000);
                  }}
                >
                  <Image src="/icons/shutdown.png" alt="" width={16} height={16} />
                  <span>Shut Down...</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
