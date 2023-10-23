import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//GET
export async function GET(
    req: Request, 
    { params }: { params: { categoryId: string } }
) {
    try {

        if(!params.categoryId){
            return new NextResponse("CategoryId is required", { status: 400}); 
        }

        const category = await prismadb.category.findUnique({
            where: {
              id: params.categoryId,
            }, 
            include: {
                billboard: true, 
            }
          });

        return NextResponse.json(category);

    } catch (error) {
        console.log(`[CATEGORYID_GET]`, error); 
        return new NextResponse("Internal error", { status: 500 }); 
    }
}

//UPDATE
export async function PATCH (
    req: Request, 
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { userId } = auth(); 

        if(!userId){
            return new NextResponse("Unauthenticated", { status: 401}); 
        }

        const body = await req.json(); 

        const { name, billboardId } = body;

        if(!name){
            return new NextResponse("name is required", { status: 400}); 
        }
        if(!billboardId){
            return new NextResponse("billboardId is required", { status: 400}); 
        }

        if(!params.categoryId){
            return new NextResponse("categoryId is required", { status: 400}); 
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

        const category = await prismadb.category.update({
            where: {
                id: params.categoryId, 
            }, 
            data: {
                name, 
                billboardId, 
            }
        }); 

        return NextResponse.json(category);

    } catch (error) {
        console.log(`[CATEGORYID_PATCH]`, error); 
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


// DELETE
export async function DELETE (
    req: Request, 
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { userId } = auth(); 

        if(!userId){
            return new NextResponse("Unauthenticated", { status: 401}); 
        }

        if(!params.categoryId){
            return new NextResponse("categoryId is required", { status: 400}); 
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

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId, 
            }, 
        }); 

        return NextResponse.json(category);

    } catch (error) {
        console.log(`[BILLBOARDID_DELETE]`, error); 
        return new NextResponse("Internal error", { status: 500 }); 
    }
}

