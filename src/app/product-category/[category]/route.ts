import { NextRequest, NextResponse } from 'next/server';
type Props={params:Promise<{category:string}>};
const redirects:Record<string,string>={engineered:'/products/engineered-hardwood','engineered-hardwood':'/products/engineered-hardwood',hardwood:'/products/hardwood','hardwood-floors':'/products/hardwood',laminate:'/products/laminate','laminate-floors':'/products/laminate',vinyl:'/products/vinyl','vinyl-floors':'/products/vinyl',offers:'/offers'};
export async function GET(request:NextRequest,{params}:Props){const {category}=await params;const target=request.nextUrl.clone();target.pathname=redirects[category]??'/products';return NextResponse.redirect(target,301)}
