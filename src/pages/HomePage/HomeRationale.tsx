import { Badge, Card, Container, Stack } from 'react-bootstrap';

const sections: RationaleSectionProps[] = [
  {
    title: 'Diversity and Inclusion',
    body: [
      `Hiring kidney dialysis patients can help to create a more diverse and inclusive workplace, where individuals with different backgrounds, abilities, and experiences are valued and respected.`,
    ],
  },
  {
    title: 'Productivity and Loyalty',
    body: [
      `Despite their health conditions and treatment schedules, many kidney dialysis patients are highly motivated and eager to work, and they can bring a strong work ethic and commitment to the job.`,
    ],
  },
  {
    title: 'Reduced Turnover',
    body: [
      'Hiring dialysis patients can reduce the cost of turnover and training, as they may be more likely to stay in their jobs for longer periods of time due to the stability and security that employment provides.',
    ],
  },
];

export default function HomeRationale() {
  return (
    <Container>
      <Stack gap={5} className="my-5 text-center">
        <h2 className="mb-3">Why should you hire patients?</h2>
        {sections.map((s, i) => (
          <RationaleSection
            key={i}
            title={s.title}
            body={s.body}
            flip={i % 2 === 1}
          />
        ))}
      </Stack>
    </Container>
  );
}

interface RationaleSectionProps {
  title: string;
  body: string[];
  flip?: boolean;
}

function RationaleSection({ title, body, flip }: RationaleSectionProps) {
  return (
    <Card>
      <h3
        className="position-absolute"
        style={{ top: -24, [flip ? 'left' : 'right']: 12 }}>
        <Badge>{title}</Badge>
      </h3>
      <Card.Body className="mt-3">
        {body.map((line, i) => (
          <Card.Text key={i} className={flip ? 'text-end' : 'text-start'}>
            {line}
          </Card.Text>
        ))}
      </Card.Body>
    </Card>
  );
}
