"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { formatCapitalize } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBreadCrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const shouldRenderPage = index === 2;
          const shouldRenderLink = pathSegments.length > 0 && !isLast;
          const isEdit = segment == "edit" ? "ubah data" + "  " + pathSegments[1] : segment == "add-new" ? "tambah data" + " " + pathSegments[1] : segment;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast && index <= 2 ? (
                  <BreadcrumbPage className="text-foreground">{formatCapitalize(isEdit)}</BreadcrumbPage>
                ) : isLast && index === 2 ? (
                  <BreadcrumbPage className="text-foreground">{formatCapitalize(isEdit)}</BreadcrumbPage>
                ) : shouldRenderPage ? (
                  <BreadcrumbPage className="text-foreground">{formatCapitalize(isEdit)}</BreadcrumbPage>
                ) : shouldRenderLink ? (
                  <BreadcrumbPage>
                    <Link className="transition-colors hover:text-foreground" href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                      {formatCapitalize(segment)}
                    </Link>
                  </BreadcrumbPage>
                ) : null}
              </BreadcrumbItem>

              {!isLast && index < 2 && <BreadcrumbSeparator className="hidden md:block" />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavBreadCrumb;
