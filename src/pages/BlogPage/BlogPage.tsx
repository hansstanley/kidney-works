import { Accordion, Badge, Card, Stack } from 'react-bootstrap';
import { Page, PageBody, PageHeader } from '../../components/Page';
import useBlogs from '../../hooks/useBlogs';

export default function BlogPage() {
  const { blogs } = useBlogs();

  const hasBlogs = !!blogs.length;

  return (
    <Page>
      <PageHeader noDivider title="Blog" tagline="Make your voice heard" />
      <PageBody>
        <Stack gap={3}>
          {hasBlogs ? (
            blogs.map((b) => (
              <Card key={b.id}>
                <Card.Body>
                  <Card.Title>
                    <h3>
                      <Badge>{b.title}</Badge>
                    </h3>
                  </Card.Title>
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <div className="row w-100">
                          <div className="col-12 text-truncate">
                            {b.story.length > 0
                              ? b.story[0]
                              : `It's awfully quiet here...`}
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        {b.story.map((block, i) => (
                          <Card.Text key={i}>{block}</Card.Text>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
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
