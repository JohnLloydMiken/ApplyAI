import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "ATS Checker", href: "#" },
      { label: "Cover Letter", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resume Tips", href: "#" },
      { label: "Career Blog", href: "#" },
      { label: "Interview Prep", href: "#" },
      { label: "Salary Guide", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const DocumentIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

const SocialButton = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-label={label}
    className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors duration-150 cursor-pointer bg-white"
  >
    {children}
  </button>
);

const FooterLinkColumn = ({ title, links }: FooterColumn) => (
  <div className="">
    <p className="text-sm font-semibold text-gray-800 mb-4">{title}</p>
    <ul className="space-y-3 flex flex-col items-center justify-center">
      {links.map(({ label, href }) => (
        <li key={label} className={``}>
          <Link
            href={href}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-gray-100">
      {/*
        ✅ FIX 1: Container width
        - Mobile:  w-11/12  (matches your header's mobile container)
        - Desktop: w-9/12   (matches your header's desktop container)
        The original used only w-9/12 which is too narrow on small screens.
      */}
      <div className="w-11/12 md:w-9/12 mx-auto pt-14 pb-8">

        {/*
          ✅ FIX 2: Grid instead of flex
          The original used `flex justify-around` which NEVER wraps.
          Grid gives you proper responsive control:
          - Mobile (default):  1 column — brand + links stack vertically
          - sm (640px+):       2 columns — brand takes full row, links pair up
          - lg (1024px+):      4 columns — brand + 3 link columns side by side
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/*
            ✅ FIX 3: Brand column spans full width on sm so it sits
            above the 2-column link grid, then returns to 1 col on lg.
          */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="#" className="flex items-center gap-2 w-fit">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-b from-primary to-purple-600 text-white shrink-0">
                <DocumentIcon />
              </div>
              <span className="text-xl font-semibold text-foreground font-sans tracking-tight">
                ResumeAI
              </span>
            </Link>

            {/* Description — removed max-w-96, let the grid column control width */}
            <p className="text-sm text-gray-500 leading-relaxed">
              AI-powered resumes and cover letters that get you hired faster.
              Trusted by 200,000+ professionals worldwide.
            </p>

            {/* Social buttons */}
            <div className="flex items-center gap-2 mt-1">
              <SocialButton label="Twitter">
                <TwitterIcon />
              </SocialButton>
              <SocialButton label="LinkedIn">
                <LinkedInIcon />
              </SocialButton>
              <SocialButton label="GitHub">
                <GitHubIcon />
              </SocialButton>
            </div>
          </div>

          {/* Link columns — each gets its own grid cell */}
          {FOOTER_COLUMNS.map((col) => (
            <FooterLinkColumn key={col.title} {...col} />
          ))}
        </div>

        {/* Divider + bottom row */}
        <div className="mt-12 border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <span>© 2026 ResumeAI. All rights reserved.</span>
          <span>Made with ♥ for job seekers everywhere</span>
        </div>
      </div>
    </footer>
  );
}