import { Badge, Card, Stack } from 'react-bootstrap';
import { Page, PageBody, PageHeader } from '../../components/Page';
import useBlogs from '../../hooks/useBlogs';

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
  const { blogs } = useBlogs();

  const hasBlogs = !!blogs.length;

  return (
    <Page>
      <PageHeader noDivider title="Blog" tagline="Make your voice heard" />
      <PageBody>
        <Stack gap={2}>
          {hasBlogs ? (
            blogs.map((b) => (
              <Card key={b.id}>
                <Card.Body>
                  <Card.Title>{b.title}</Card.Title>
                  <Card.Text>
                    {b.story.map((block, i) => (
                      <div key={i}>
                        {block}
                        <br />
                        <br />
                      </div>
                    ))}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>{b.createdAt.toLocaleString()}</Card.Footer>
              </Card>
            ))
          ) : (
            <Card>
              <Card.Body>
                <Card.Text>No blogs.</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Stack>
      </PageBody>
    </Page>
  );
}
