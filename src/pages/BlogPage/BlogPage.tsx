import { Badge, Card, Stack } from 'react-bootstrap';
import { Page, PageBody, PageHeader } from '../../components/Page';

const blogs = [
  {
    id: 1,
    title: 'Blog 1',
    description: 'This is blog 1.',
    tags: ['hello', 'world'],
  },
  { id: 2, title: 'Blog 2', description: 'This is blog 2.' },
  {
    id: 3,
    title: 'Blog 3',
    description: 'This is blog 3.',
    tags: ['hi', 'bye'],
  },
];

export default function BlogPage() {
  return (
    <Page>
      <PageHeader noDivider title="Blog" tagline="Make your voice heard" />
      <PageBody>
        <Stack gap={2}>
          {blogs.map((b) => (
            <Card key={b.id}>
              <Card.Body>
                <Card.Title>{b.title}</Card.Title>
                <Card.Text>{b.description}</Card.Text>
                {b.tags ? (
                  <Stack direction="horizontal" gap={1}>
                    {b.tags?.map((t, i) => (
                      <Badge key={i} pill bg="secondary">
                        {t}
                      </Badge>
                    ))}
                  </Stack>
                ) : null}
              </Card.Body>
            </Card>
          ))}
        </Stack>
      </PageBody>
    </Page>
  );
}
