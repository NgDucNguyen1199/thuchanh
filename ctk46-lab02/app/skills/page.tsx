const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Git"];

export default function SkillsPage() {
  return (
    <section className="card">
      <h2>Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

