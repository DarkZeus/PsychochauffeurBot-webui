import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export type BreadcrumbItem = {
  title: string;
  href?: string;
  isCurrentPage?: boolean;
}

type BreadcrumbProps = {
  items: BreadcrumbItem[];
}
export function SidebarBreadcrumb({ items }: BreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.isCurrentPage ? (
                <BreadcrumbPage><span className={"font-semibold"}>{item.title}</span></BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href || "#"}>{item.title}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}