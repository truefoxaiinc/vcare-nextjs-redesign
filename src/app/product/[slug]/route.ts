import { NextRequest, NextResponse } from 'next/server';
type Props={params:Promise<{slug:string}>};
export async function GET(request:NextRequest,{params}:Props){const {slug}=await params;const target=request.nextUrl.clone();target.pathname='/products/'+slug;return NextResponse.redirect(target,301)}
