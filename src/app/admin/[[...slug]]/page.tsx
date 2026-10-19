import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductExplorer } from '@/components/catalog-ui';
import { ProductDetail } from '@/components/product-detail';
import { categories, isProductPublishable, products, suppliers } from '@/data/catalog';

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug?: string[] }> };

const links = [
  {label:'Overview',path:'/admin',icon:'⌂',group:'WORKSPACE'},
  {label:'Products',path:'/admin/products',icon:'▤',group:'CATALOG'},
  {label:'Categories',path:'/admin/categories',icon:'◫',group:'CATALOG'},
  {label:'Offers',path:'/admin/offers',icon:'％',group:'CATALOG'},
  {label:'Leads & quotes',path:'/admin/leads',icon:'↗',group:'SALES'},
  {label:'Blog articles',path:'/admin/blog',icon:'≡',group:'CONTENT'},
  {label:'Gallery',path:'/admin/gallery',icon:'▧',group:'CONTENT'},
  {label:'Pages & FAQs',path:'/admin/pages',icon:'▣',group:'CONTENT'},
  {label:'Media library',path:'/admin/media',icon:'▧',group:'CONTENT'},
  {label:'SEO & redirects',path:'/admin/seo',icon:'⌕',group:'SITE'},
  {label:'Settings',path:'/admin/settings',icon:'⚙',group:'SITE'},
  {label:'Users & roles',path:'/admin/users',icon:'♙',group:'SECURITY'},
  {label:'Audit log',path:'/admin/audit-log',icon:'◷',group:'SECURITY'}
];

const headings: Record<string, [string, string]> = {
  products:['Products','Review supplier mappings for the public catalogue.'],
  categories:['Categories','Organize materials, collections and attributes.'],
  offers:['Offers','No public product markdowns are displayed.'],
  leads:['Leads & quotes','Keep project enquiries moving.'],
  blog:['Blog articles','Edit guides and flooring inspiration.'],
  gallery:['Gallery','Organize room and project photography.'],
  pages:['Pages & FAQs','Manage public pages and frequently asked questions.'],
  media:['Media library','Find and organize images and files.'],
  seo:['SEO & redirects','Review search metadata, canonical URLs and legacy paths.'],
  settings:['Settings','Business information and site preferences.'],
  users:['Users & roles','Manage administrator access.'],
  'audit-log':['Audit log','Review administrative activity.']
};

function shortName(path: string) {
  return path.split('/').filter(Boolean).at(-1) ?? 'overview';
}

export default async function AdminPage({ params }: Props) {
  const { slug = [] } = await params;
  const publishedProducts = products.filter(isProductPublishable);
  const active = slug[0] ?? 'overview';
  const isHome = active === 'overview';
  const previewProduct = active === 'products' && slug[1]
    ? products.find(product => product.slug === slug[1])
    : undefined;
  if (active === 'products' && slug[1] && !previewProduct) notFound();
  const [title, subtitle] = isHome
    ? ['Good afternoon, Vcare.','Here is a clear view of what needs attention.']
    : headings[active] ?? [active,'Workspace view'];
  const rows = active === 'leads'
    ? [
        ['Jamie Parker','Hardwood · 620 sq. ft.','New'],
        ['Maya Singh','Vinyl · Basement','Contacted'],
        ['Alex Chen','Laminate · 3 rooms','Quoted'],
        ['Morgan Lee','Engineered · 480 sq. ft.','New']
      ]
    : active === 'products'
      ? products.map(product => [
          product.name,
          product.supplier + ' · ' + product.category,
          product.sourceStatus === 'unresolved'
            ? 'Source verification required'
            : isProductPublishable(product) ? 'Published' : 'Rights pending'
        ])
      : [
          ['Floor catalogue','—','Ready'],
          ['Public site content','—','Preview'],
          ['Lead management','—','Setup needed'],
          ['SEO foundations','—','Configured']
        ];
  const stats = isHome
    ? [
        ['New enquiries','12','This week'],
        ['Quotes in progress','8','Across all stages'],
        ['Supplier categories',String(categories.length),'Client-provided mapping'],
        ['Mapped suppliers',String(suppliers.length),'Across categories']
      ]
    : [
        ['Configured items',active === 'products' ? String(products.length) : String(categories.length),active === 'products' ? 'Authentic products' : 'Supplier categories'],
        ['Published',active === 'products' ? String(publishedProducts.length) : '0',active === 'products' ? 'Authorization complete' : 'Review required'],
        ['Last updated','Today','Preview data'],
        ['Section status','Draft','Not connected']
      ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo"><span className="admin-mark">V</span><div><b>Vcare</b><small>ADMIN PREVIEW</small></div></div>
        <nav className="admin-nav">
          {['WORKSPACE','CATALOG','SALES','CONTENT','SITE','SECURITY'].map(group => (
            <div key={group}>
              <div className="admin-nav-label">{group}</div>
              {links.filter(link => link.group === group).map(link => (
                <Link key={link.path} className={(isHome ? link.path === '/admin' : shortName(link.path) === active) ? 'active' : ''} href={link.path}>
                  <span>{link.icon}</span>{link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <section className="admin-content">
        <div className="admin-top"><span className="admin-breadcrumb">Vcare / {isHome ? 'Overview' : title}</span><span className="admin-user"><span className="admin-avatar">V</span> Static catalogue preview</span></div>
        <div className="admin-preview-notice"><b>Authenticated static catalogue preview</b><span>Catalogue records come directly from src/data/catalog.ts. This preview does not change publication status.</span></div>
        {previewProduct ? (
          <>
          <ProductDetail
            product={previewProduct}
            related={products.filter(product => product.category === previewProduct.category && product.slug !== previewProduct.slug).slice(0, 4)}
            categoryHref="/admin/catalogue-preview"
            productsHref="/admin/catalogue-preview"
            productHrefBase="/admin/products"
            preview
          />
          <section className="admin-approval-panel">
            <h2>Static publication status</h2>
            <p>Publication: <strong>{previewProduct.publicationStatus}</strong> · Image reuse authorization: <strong>{previewProduct.imageAuthorizationStatus}</strong> · Description reuse authorization: <strong>{previewProduct.descriptionAuthorizationStatus}</strong></p>
            <p>Only update the static publication and authorization fields after the client or supplier has documented reuse permission. This preview is read-only.</p>
          </section>
          </>
        ) : <><div className="admin-title">
          <div><h1>{title}</h1><p>{subtitle}</p></div>
          <Link className="button button-primary button-small" href={active === 'products' ? '/admin/catalogue-preview' : '/get-a-quote'}>{active === 'products' ? 'Open all product drafts ↗' : 'View public site ↗'}</Link>
        </div>
        <div className="admin-stats">
          {stats.map(stat => <article className="admin-stat" key={stat[0]}><small>{stat[0]}</small><strong>{stat[1]}</strong><span>{stat[2]}</span></article>)}
        </div>
        {active === 'products' ? (
          <div className="admin-catalog-preview"><ProductExplorer products={products} hrefBase="/admin/products" showApprovalStatus productLabel="draft product" /></div>
        ) : active === 'audit-log' ? (
          <section className="admin-panel">
            <h2>Catalogue publication</h2>
            <p>Catalogue approvals are managed as static source changes. Authorization evidence must be retained with the client’s business records; this preview does not create a database audit trail.</p>
          </section>
        ) : <div className="admin-grid">
          <section className="admin-panel">
            <h2>{active === 'leads' ? 'Recent project enquiries' : active === 'products' ? 'Product approval register' : 'Recent activity'}</h2>
            {rows.map(row => <div className="admin-row" key={row[0]}><b>{row[0]}</b><span>{row[1]}</span><span className={'status-pill ' + (row[2] === 'Mapped' || row[2] === 'Ready' ? 'green' : '')}>{row[2]}</span></div>)}
          </section>
          <section className="admin-panel">
            <h2>{isHome ? 'Quick actions' : title + ' tools'}</h2>
            {(active === 'leads' ? ['Open quote inbox','Export leads','Review response templates'] : active === 'products' ? ['Verify source URL and category','Record approver, approval date and evidence reference','Set publication status after reuse rights are approved'] : ['Edit page content','Review site settings','Open SEO checklist']).map(item => <div className="admin-row" key={item}><b>{item}</b><span>›</span></div>)}
            <p style={{fontSize:9,color:'#85908a',marginTop:16}}>{active === 'products' ? 'Open a product to review its source record and authorization status.' : 'Actions are visual placeholders until these admin services are connected.'}</p>
          </section>
        </div>}</>}
      </section>
    </div>
  );
}
