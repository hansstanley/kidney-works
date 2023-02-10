import { useState } from "react";
import AppBlog from "../../types/blog.app"
import { Accordion, Badge, Card } from 'react-bootstrap';

export interface BlogStoryProps {
    blog: AppBlog;
  }

export default function BlogStory({ blog }: BlogStoryProps) {

    const [showHeader, setShowHeader] = useState(true);

    return (
        <Card key={blog.id}>
          <Card.Body>
            <Card.Title>
              <h3>
                <Badge>{blog.title}</Badge>
              </h3>
            </Card.Title>
            <Accordion className="mt-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header onClick={() => setShowHeader(!showHeader)}>
                  <div className="row w-100">
                    <div className="col-12 text-truncate">
                        { showHeader 
                            ? blog.story.length > 0 
                                ? blog.story[0] 
                                : `It's awfully quiet here...`
                            : null
                        }
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {blog.story.map((block, i) => (
                    <Card.Text key={i}>{block}</Card.Text>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
          <Card.Footer>{blog.createdAt.toLocaleString()}</Card.Footer>
        </Card>
      )
}