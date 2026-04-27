import { Suspense, lazy, useEffect } from 'react';
import type { RouteObject } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { historyEngagements } from '../content/history';
import App from './App';

const HomePage = lazy(() => import('../pages/HomePage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const HistoryPage = lazy(() => import('../pages/HistoryPage'));
const EngagementGalleryPage = lazy(() => import('../pages/EngagementGalleryPage'));
const CertificationsPage = lazy(() => import('../pages/CertificationsPage'));
const PartnersPage = lazy(() => import('../pages/PartnersPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('../pages/TermsOfServicePage'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RouteFallback = () => (
  <div className="min-h-screen bg-[#0A1128]" aria-busy="true" />
);

type ExtendedRouteObject = RouteObject & {
  getStaticPaths?: () => string[] | Promise<string[]>;
  children?: ExtendedRouteObject[];
};

export const routes: ExtendedRouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <HomePage />
            </Suspense>
          </>
        ),
      },
      {
        path: '/services',
        element: (
          <>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <ServicesPage />
            </Suspense>
          </>
        ),
      },
      {
        path: '/history',
        element: (
          <>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <HistoryPage />
            </Suspense>
          </>
        ),
      },
      {
        path: '/history/gallery/:engagementId',
        element: (
          <>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <EngagementGalleryPage />
            </Suspense>
          </>
        ),
        getStaticPaths: () => {
          return historyEngagements.map(e => `/history/gallery/${e.id}`);
        },
      },
      {
        path: '/certifications',
        element: (
          <>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <CertificationsPage />
            </Suspense>
          </>
        ),
      },
      {
        path: '/partners',
        element: (
          <>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <PartnersPage />
            </Suspense>
          </>
        ),
      },
      {
        path: '/privacy-policy',
        element: (
          <>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <PrivacyPolicyPage />
            </Suspense>
          </>
        ),
      },
      {
        path: '/terms-of-service',
        element: (
          <>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <TermsOfServicePage />
            </Suspense>
          </>
        ),
      },
    ],
  },
];
