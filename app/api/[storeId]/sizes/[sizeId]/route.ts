import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//GET
export async function GET(
    req: Request, 
    { params }: { params: { sizeId: string } }
) {
    try {

        if(!params.sizeId){
            return new NextResponse("sizeId is required", { status: 400}); 
        }

        const size = await prismadb.size.findUnique({
            where: {
              id: params.sizeId,
            }
          });

        return NextResponse.json(size);

    } catch (error) {
        console.log(`[SIZEID_GET]`, error); 
        return new NextResponse("Internal error", { status: 500 }); 
    }
}

//UPDATE
export async function PATCH(
    req: Request,
    { params }: { params: { sizeId: string, storeId: string } }
  ) {
    try {
      const { userId } = auth();
  
      const body = await req.json();
  
      const { name, value } = body;
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!name) {
        return new NextResponse("Name is required", { status: 400 });
      }
  
      if (!value) {
        return new NextResponse("Value is required", { status: 400 });
      }
  
  
      if (!params.sizeId) {
        return new NextResponse("Size id is required", { status: 400 });
      }
  
      const storeByUserId = await prismadb.store.findFirst({
        where: {
          id: params.storeId,
          userId
        }
      });
  
      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const size = await prismadb.size.update({
        where: {
          id: params.sizeId
        },
        data: {
          name,
          value
        }
      });
    
      return NextResponse.json(size);
    } catch (error) {
      console.log('[SIZE_PATCH]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };


// DELETE
export async function DELETE (
    req: Request, 
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const { userId } = auth(); 

        if(!userId){
            return new NextResponse("Unauthenticated", { status: 401}); 
        }

        if(!params.sizeId){
            return new NextResponse("sizeId is required", { status: 400}); 
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
              id: params.storeId,
              userId,
            }
          });
      
        if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
        }

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId, 
            }, 
        }); 

        return NextResponse.json(size);

    } catch (error) {
        console.log(`[_DELETE]`, error); 
        return new NextResponse("Internal error", { status: 500 }); 
    }
}

