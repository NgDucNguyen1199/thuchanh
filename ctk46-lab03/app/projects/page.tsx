import Link from "next/link";
import { projects } from "../../data/projects";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Dự án</h1>
      <p className="text-gray-500 mb-8">Một số dự án tiêu biểu mình đã thực hiện trong quá trình học.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <Badge key={`${project.id}-${item}`} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/projects/${project.id}`} className="text-blue-600 text-sm hover:underline">
                Xem chi tiết →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
